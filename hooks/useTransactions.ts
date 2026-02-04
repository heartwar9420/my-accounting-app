//  這裡標記為 'use client'，代表這個零件需要「通電」才能運作。
//  只要有用到「記錄變化(useState)」或是「與外部連線(Firebase)」就需要寫這個。
//  簡單來說：因為這個畫面需要「監聽使用者的動作」，
//  我們就要告訴電腦：請讓這個零件在瀏覽器端活躍起來。
'use client';

// React 的內建 Hook
// useState: 讓組件擁有「筆記本」功能，用來記錄 email、密碼或登入狀態。
// useEffect: 組件的「自動處理器」適合處理：
// 1. 剛進頁面只做一次的事（例如：檢查登入狀態）。
// 2. 某個數值變了才聯動的事（例如：使用者 ID 變了，就去雲端拿他的資料）。
// 3. 離開頁面時要做的收尾（例如：關掉監聽器，避免耗電）。
import { useState, useEffect } from 'react';

// 拿取 Firebase 專門管帳號的工具：
// onAuthStateChanged: 自動監聽使用者的登入/登出狀態
import { onAuthStateChanged } from 'firebase/auth';

//  拿取連線工具：我們已經在 lib/firebase.ts 設定好了，
//  現在把它拿過來，讓我們能 存取資料庫 (db) 和 看是誰登入(auth)
import { auth, db } from '@/lib/firebase';

// 從 firestore 引入操作資料庫的工具
// collection = 指定資料夾 collection(db, 'transactions')
// query = 下達搜尋指令
// orderBy = 排序方式 DESC = 降冪 , ASC = 升冪
// onSnapshot = 即時監視器，只要有更新就會馬上更新頁面
// doc = 指定某一特定 id 的工具
// deleteDoc = 刪除某一特定 id 的工具
// where = 搜尋條件
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, where } from 'firebase/firestore';

// 用來切換頁面的工具
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  price: number;
  note: string;
  type: string;
}

export function useTransactions() {
  // [] 代表陣列
  // 儲存所有記帳紀錄的清單，後面的「([])」代表預設為空陣列
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 初始值是空字串，而不是None。
  const [email, setEmail] = useState('');

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // 剛進頁面，確認是否有登入

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 監聽登入狀態
  // useEffect 是 React 的一個工具，在這邊做的是：
  // 2. 某個數值變了才聯動的事（例如：使用者 ID 變了，就去雲端拿他的資料）。
  useEffect(() => {
    // onAuthStateChanged: 自動監聽使用者的登入/登出狀態
    // auth: 看是誰登入
    // user: 如果有登入，就會把抓到的資料存到 user 變數中
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 如果 user 有資料就把 isLoggedIn 設為 true
        setIsLoggedIn(true);
        // 把 email 設定為 user.email ，但如果沒有資料 就設成 '' 空字串
        setEmail(user.email || '');
        setIsLoading(false);
      } else {
        // 如果沒有登入就把 isLoggedIn 設為 false
        setIsLoggedIn(false);
        // 並且強制把使用者退回首頁
        router.push('/');
      }
    });

    // 當使用者離開這個頁面時，這行會主動「斷開連線」。
    return () => unsubscribe();

    // 最後這個 [] 括號代表：這個感應器只在「剛進入這個頁面時」裝上去一次就好
  }, []);

  // 監聽資料庫變動
  useEffect(() => {
    // 如果沒有登入就不要抓資料
    if (!auth.currentUser) return;

    // 建立一個查詢命令，從 transactions 資料夾
    // 依照 createdAt 的 desc / 降冪(新到舊)排序
    const q = query(
      collection(db, 'transactions'),
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
    );

    // 開啟監聽器(onSnapshot) 只要有變動就會顯示
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // 把資料做成我們要的樣子
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id, // 把雲端生成的id 當成我們要的id

          // ... 是展開運算子, 會把雲端的data 展開成 doc.type, doc.price, doc.note
          ...doc.data(),
        } as Transaction;
        // 抓回來的資料要和TypeScript說一聲
        // 這個資料是 Transaction
      });

      // 用整理好的資料重整資料
      setTransactions(data);
    });

    // 當使用者離開這個頁面時，這行會主動「斷開連線」。
    return () => unsubscribe();

    // 最後這個 [] 括號代表：這個感應器只在「剛進入這個頁面時」裝上去一次就好
  }, []);

  // 刪除功能
  const deleteTransaction = async (id: string) => {
    try {
      // 告訴 Firebase 在 'transactions' 資料夾中找到 'id' 這個文件
      const docRef = doc(db, 'transactions', id);

      // 呼叫 deleteDoc
      await deleteDoc(docRef);
    } catch (error) {
      alert('發生錯誤！' + error);
    }
  };

  // 計算總金額
  // prev 是累加的成果 而item是每一筆記錄
  const totalPrice = transactions.reduce((prev, item) => {
    if (item.type === 'income') {
      return prev + item.price;
    } else {
      return prev - item.price;
    }
  }, 0); // 0 代表 計算的起始金額
  return { transactions, email, isLoading, isLoggedIn, deleteTransaction, totalPrice };
}

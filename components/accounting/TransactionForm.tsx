// React 的內建 Hook , useState: 讓組件擁有「筆記本」功能，用來記錄 email、密碼或登入狀態。

import { useState } from 'react';

// 從 firestore 引入操作資料庫的工具
// collection = 指定資料夾 collection(db, 'transactions')
// addDoc = 新增一筆資料 addDoc(位置, 資料) 並且會生成一個專屬的 id
import { collection, addDoc } from 'firebase/firestore';

//  拿取連線工具：我們已經在 lib/firebase.ts 設定好了，
//  現在把它拿過來，讓我們能 存取資料庫 (db) 和 看是誰登入(auth)

import { auth, db } from '@/lib/firebase';

import BigButton from '@/components/ui/BigButton';

export default function TransactionForm() {
  // 類型，預設是支出，因為支出更常被用到
  const [type, setType] = useState('expense');

  // 金額，預設是空，由使用者自己填上金額
  const [price, setPrice] = useState('');

  // 說明，預設是空，由使用者自己填上說明
  const [note, setNote] = useState('');

  const handleAdd = async () => {
    try {
      if (!price) {
        alert('金額不可以為空');
        return;
      } else {
        // 新增的清單
        const newTransactions = {
          type: type,
          price: Number(price),
          note: note,
          createdAt: new Date().getTime(), // 抓到建立時間
          uid: auth.currentUser?.uid, // 抓到建立的 user id
        };

        // 呼叫 firebase 把newTransactions 加到 db 中的 'transactions' 資料夾
        // addDoc (位置=(collection (資料庫,資料夾)),資料)
        await addDoc(collection(db, 'transactions'), newTransactions);
      }
    } catch (error) {
      alert('發生錯誤！' + error);
    } finally {
      setPrice('');
      setNote('');
    }
  };
  return (
    <div className="flex gap-2 mt-10 text-normal">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border-2 border-[#666666]/30 rounded font-extrabold px-5"
      >
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        className="border-2 border-[#666666]/30 rounded px-5 max-w-30"
      />
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        type="text"
        placeholder="說明"
        className="border-2 border-[#666666]/30 rounded pl-5"
      />
      <BigButton title="新增紀錄" onClick={handleAdd} />
    </div>
  );
}

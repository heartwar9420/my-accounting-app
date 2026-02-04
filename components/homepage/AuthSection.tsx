// React 的內建 Hook , useState: 讓組件擁有「筆記本」功能，用來記錄 email、密碼或登入狀態。
import { useState } from 'react';

// 拿取 Firebase 專門管帳號的工具：
// createUserWithEmailAndPassword: 註冊新帳號
// signInWithEmailAndPassword: 登入舊帳號
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

//  拿取連線工具：我們已經在 lib/firebase.ts 設定好了，
//  現在把它拿過來，讓我們能 看是誰登入(auth)
import { auth } from '@/lib/firebase';

import SmallButton from '../ui/SmallButton';
import ShowWarning from '../ui/ShowWarning';

export default function AuthSection({ title }: { title: string }) {
  // 初始值是空字串，而不是None。
  const [email, setEmail] = useState('');

  // 初始值是空字串，而不是None。
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      if (title === '註冊') {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('註冊成功');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('登入成功');
      }
    } catch (error: any) {
      // any = 任何錯誤
      console.log(error.code);
      let message = '發生未知錯誤';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = '這個 Email 已經被註冊過了';
          break;
        case 'auth/wrong-password':
          message = '密碼錯誤，請再試一次';
          break;
        case 'auth/invalid-credential':
          message = '帳號或密碼錯誤';
          break;
        case 'auth/too-many-requests':
          message = '登入失敗太多次，請稍後再試';
          break;
        case 'auth/invalid-email':
          message = 'Email 格式不正確';
          break;
        default:
          message = '發生錯誤！' + error.message;
      }
      alert(message);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  const isVaild = email.length > 0 && password.length >= 6;

  return (
    <div>
      <div className="flex flex-col items-center gap-2 p-4">
        <h2 className="text-2xl font-bold">{title}系統</h2>
        <div className="flex items-center">
          <span className="mr-2">電郵</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-[#666666]/30 w-60 rounded"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2">密碼</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-[#666666]/30 w-60 rounded"
          />
        </div>
        <SmallButton title={title} onClick={handleAuth} disabled={!isVaild} />
        {/* 第一個 && 是 or 第二個 && 是 react的語法 表示 如果前面符合 就做後面的事 */}
        {password.length >= 1 && password.length < 6 && <ShowWarning />}
      </div>
    </div>
  );
}

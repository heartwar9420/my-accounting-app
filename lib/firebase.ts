// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
// 當連線成功後，所有的設定都會被放到 app 變數中
const app = initializeApp(firebaseConfig);

// export = 可以被其他檔案使用
export const auth = getAuth(app); //負責登入
export const db = getFirestore(app); //負責記帳的database, Firestore 資料庫實例，負責存取記帳數據

// 負責登出 因為是非同步的動作 (需要 await )
// 所以要寫 try / catch 因為只要和網路有關 就有可能失敗
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    alert('發生錯誤！' + error);
  }
};

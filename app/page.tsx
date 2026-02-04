//  這裡標記為 'use client'，代表這個零件需要「通電」才能運作。
//  只要有用到「記錄變化(useState)」或是「與外部連線(Firebase)」就需要寫這個。
//  簡單來說：因為這個畫面需要「監聽使用者的動作」，
//  我們就要告訴電腦：請讓這個零件在瀏覽器端活躍起來。
'use client';

import { useTransactions } from '@/hooks/useTransactions';

import Header from '@/components/layout/Header';
import AuthSection from '@/components/homepage/AuthSection';
import Welcome from '@/components/layout/Welcome';

export default function HomePage() {
  const { email, isLoggedIn } = useTransactions();
  return (
    <div className="flex flex-col">
      <Header />
      {isLoggedIn ? <Welcome email={email} isHomePage={true} /> : <AuthSection title="登入" />}
      <AuthSection title="註冊" />
    </div>
  );
}

//  這裡標記為 'use client'，代表這個零件需要「通電」才能運作。
//  只要有用到「記錄變化(useState)」或是「與外部連線(Firebase)」就需要寫這個。
//  簡單來說：因為這個畫面需要「監聽使用者的動作」，
//  我們就要告訴電腦：請讓這個零件在瀏覽器端活躍起來。
'use client';

import { useTransactions } from '@/hooks/useTransactions';

import TransactionForm from '@/components/accounting/TransactionForm';
import Welcome from '@/components/layout/Welcome';
import TransactionItem from '@/components/accounting/TransactionItem';
import TotalBalance from '@/components/accounting/TotalBalance';
import Link from 'next/link';
import BigButton from '@/components/ui/BigButton';
import LoadingView from '@/components/ui/LoadingView';

export default function AccountingPage() {
  const { transactions, email, isLoading, deleteTransaction, totalPrice } = useTransactions();
  if (isLoading) {
    return <LoadingView />;
  }
  return (
    <div>
      <div className="flex flex-col items-center pb-4 border-b-2 border-[#666666]/10">
        <Welcome email={email} isHomePage={false} />
        <TransactionForm />
      </div>
      {transactions.map((item) => (
        <TransactionItem key={item.id} {...item} onDelete={deleteTransaction} />
      ))}
      <TotalBalance totalPrice={totalPrice} />
      <div className="flex justify-center mt-10">
        <Link href={'/'}>
          <BigButton title="返回首頁" />
        </Link>
      </div>
    </div>
  );
}

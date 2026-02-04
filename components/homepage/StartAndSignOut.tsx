import Link from 'next/link';
import BigButton from '@/components/ui/BigButton';
import SmallButton from '@/components/ui/SmallButton';

// signOut 是我們自己在 firebase.ts 寫的一個方法
import { signOut } from '@/lib/firebase';

export default function StartAndSignOut() {
  return (
    <div className="flex">
      <Link href="/accounting">
        <BigButton title="立即開始" />
      </Link>
      <div className="mr-2 bg-amber-100"></div>
      <SmallButton title="登出" onClick={signOut} />
    </div>
  );
}

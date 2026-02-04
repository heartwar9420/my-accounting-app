//  這裡標記為 'use client'，代表這個零件需要「通電」才能運作。
//  只要有用到「記錄變化(useState)」或是「與外部連線(Firebase)」就需要寫這個。
//  簡單來說：因為這個畫面需要「監聽使用者的動作」，
//  我們就要告訴電腦：請讓這個零件在瀏覽器端活躍起來。
'use client';

import SmallButton from '@/components/ui/SmallButton';

interface Props {
  id: string;
  type: string;
  price: number;
  note: string;
  onDelete: (id: string) => void;
}
export default function TransactionItem({ type, price, note, id, onDelete }: Props) {
  return (
    <div className="flex justify-between mt-1 w-1/2 mx-auto ">
      {type === 'income' ? (
        <span className="flex items-center justify-center text-green-700 w-24">{price}</span>
      ) : (
        <span className="flex items-center justify-center text-red-700 w-24">- {price}</span>
      )}
      <div className="flex items-center justify-center flex-1">{note}</div>
      <div className="flex justify-end w-15">
        <SmallButton title="刪除" onClick={() => onDelete(id)} />
      </div>
    </div>
  );
}

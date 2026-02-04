interface Props {
  totalPrice: number;
}
export default function TotalBalance({ totalPrice }: Props) {
  const amountColor = totalPrice >= 0 ? 'text-green-700' : 'text-red-700';

  return (
    <div className="flex justify-center mt-10 text-base">
      小計：
      <span className={amountColor}>{totalPrice.toLocaleString()}</span>
      {/* toLocaleString = 每三位數加一個逗號 */}
    </div>
  );
}

interface Props {
  title: string;

  // 「?」代表這個組件在使用的時候不一定要把onClick傳進去
  // 「()」 代表執行這功能時不用給它額外的資料
  // 「void」代表功能跑完後，不用回傳任何結果
  onClick?: () => void;

  // 「disabled」 代表是否可點擊
  // true = 禁用 , false = 未禁用(可點擊)
  disabled?: boolean;
}

export default function SmallButton({ title, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-m cursor-pointer border-2 border-[#666666]/30 px-2 py-1 rounded bg-slate-300 
      hover:bg-slate-300/80 transition-colors
      disabled:bg-red-300 disabled:cursor-not-allowed"
    >
      {title}
    </button>
  );
}

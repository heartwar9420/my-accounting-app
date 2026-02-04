interface Props {
  title: string;

  // 「?」代表這個組件在使用的時候不一定要把onClick傳進去
  // 「()」 代表執行這功能時不用給它額外的資料
  // 「void」代表功能跑完後，不用回傳任何結果
  onClick?: () => void;
}
export default function BigButton({ title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-l cursor-pointer border-2 border-[#666666]/30 px-4 py-2 rounded bg-slate-300 hover:bg-slate-300/80 transition-colors"
    >
      {title}
    </button>
  );
}

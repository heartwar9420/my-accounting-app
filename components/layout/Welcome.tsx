import StartAndSignOut from '@/components/homepage/StartAndSignOut';

interface Props {
  email: string;
  isHomePage: boolean;
}

export default function Welcome({ email, isHomePage }: Props) {
  if (isHomePage) {
    return (
      <div className="flex flex-col justify-center items-center mt-10 gap-3">
        <div className="text-xl">已經使用 {email} 登入</div>
        <StartAndSignOut />
      </div>
    );
  }
  return <div className=" mt-10 text-3xl font-bold text-[#666666]">您已經使用{email}登入</div>;
}

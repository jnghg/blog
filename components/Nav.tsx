import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthButton from "./AuthButton";
import { MenuBar } from "./MenuBar";
import { getServerSession } from "next-auth/next";
import { LoginButton } from "./LoginButton";
import Link from "next/link";

export default async function Nav() {
  const session = (await getServerSession(authOptions)) as any;
  return (
    <nav className="w-full flex justify-center border-b h-16 sticky top-0 z-[222] bg-white">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <div className="bg-sky-100 p-5 rounded-full" />
          </Link>
          <div>
            <MenuBar />
          </div>
        </div>
        {session?.user ? <AuthButton user={session.user} /> : <LoginButton />}
      </div>
    </nav>
  );
}

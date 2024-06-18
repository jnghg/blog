"use client";

import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SessionButton(session: any) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={session?.user?.image || ""} alt="@blog" />
        <AvatarFallback />
      </Avatar>
      <button
        className="py-2 px-4 rounded-md no-underline bg-opacity-20 bg-slate-400 hover:bg-slate-600 hover:bg-opacity-20 duration-300"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}

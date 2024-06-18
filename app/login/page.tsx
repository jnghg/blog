"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <div>
          <Input
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <button
          className="border rounded-md bg-slate-50 px-4 py-2 text-foreground mb-2 hover:bg-slate-100 duration-300"
          onClick={() => {
            if (email) signIn("email", { email });
          }}
        >
          Email로 로그인
        </button>
        <div className="border-[1px] border-solid mt-3 mb-10" />
        <div className="absolute -mt-36 ml-[150px] md:ml-44 text-gray-400 bg-white px-2">
          or
        </div>

        <button
          className="bg-green-700 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
          onClick={() => signIn("google")}
        >
          구글 로그인
        </button>
        <button
          className="bg-green-700 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
          onClick={() => signIn("kakao")}
        >
          카카오 로그인
        </button>
        <button
          className="bg-green-700 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
          onClick={() => signIn("github")}
        >
          Github 로그인
        </button>
        <button
          className="border border-foreground/20 rounded-md px-4 py-2 mb-2"
          type="button"
          onClick={() => router.push("/")}
        >
          메인화면으로
        </button>
      </div>
    </div>
  );
}

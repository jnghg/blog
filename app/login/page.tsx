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
        <button
          className="bg-blue-400 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
          onClick={() => signIn("google")}
        >
          구글 로그인
        </button>
        <button
          className="bg-yellow-500 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
          onClick={() => signIn("kakao")}
        >
          카카오 로그인
        </button>
        <button
          className="bg-gray-500 rounded-md px-4 py-2  mb-2 text-white hover:bg-opacity-90 duration-300"
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

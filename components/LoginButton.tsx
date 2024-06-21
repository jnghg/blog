import Link from "next/link";

export function LoginButton() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-opacity-20 bg-slate-300 hover:bg-slate-400 hover:bg-opacity-20 duration-300"
      >
        Login
      </Link>
    </div>
  );
}

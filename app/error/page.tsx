import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <div className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <div className="text-center font-bold text-2xl">
            오류가 발생했습니다. 😫
          </div>
          <Link
            className="text-center border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            href={"/"}
          >
            <button type="button">메인화면으로</button>
          </Link>
        </div>
      </div>
    </>
  );
}

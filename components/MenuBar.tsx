import Link from "next/link";

export async function MenuBar() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/blog"
        className="py-2 px-3 flex rounded-md no-underline bg-opacity-20 border-[1px] border-solid hover:bg-green-700 hover:bg-opacity-20 duration-300"
      >
        Blog
      </Link>
    </div>
  );
}

import Link from "next/link";
import { getPosts } from "../api/post";
import { BlogCard } from "@/components/BlogCard";

export default async function BlogPages() {
  const posts = await getPosts();

  return (
    <>
      <div className="w-full">
        <Link
          href={"/blog/write"}
          className="float-end py-2 px-3 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 duration-300"
        >
          글쓰기
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {posts?.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            className="rounded-lg transform transition-transform hover:-translate-y-2 shadow-lg duration-300"
            key={post.id}
          >
            <BlogCard
              key={post.id}
              title={post.title}
              date={post.createAt}
              image={post.user.image ?? ""}
              name={post.user.name ?? ""}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

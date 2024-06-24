import { getPost } from "@/app/api/post";
import BlogPost from "@/components/BlogPost";
import { redirect } from "next/navigation";

export default async function Blog({ params }: { params: { blogId: string } }) {
  const post = await getPost(params.blogId);

  if (!post) redirect("/blog");

  return (
    <BlogPost title={post?.title} content={post?.content} editable={false} />
  );
}

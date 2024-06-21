"use server";

import { PostProps } from "@/types/post";
import client from "@/utils/prisma/client";
import { redirect } from "next/navigation";
import { getUser } from "./user";

// 블로그 생성
export async function createPost(post: PostProps) {
  try {
    const user = await getUser();

    return await client.post.create({
      data: {
        userId: user?.id || "",
        title: post?.title || "",
        content: post?.content || "",
      },
    });
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

// 블로그 목록
export async function getPosts() {
  try {
    return await client.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

// 블로그 상세
export async function getPost(id: string) {
  try {
    return await client.post.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

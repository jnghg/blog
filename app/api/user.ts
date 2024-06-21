"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import client from "@/utils/prisma/client";
import { redirect } from "next/navigation";

// 유저정보
export async function getUser() {
  try {
    const session = await getServerSession(authOptions);

    const user = await client.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    redirect("/error");
  }
}

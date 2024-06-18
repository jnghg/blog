"use server";

import client from "@/utils/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// 토큰생성
export async function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let clientId = "";
  let clientSecret = "";
  for (let i = 0; i < 50; i++) {
    clientId += characters.charAt(Math.floor(Math.random() * 20));
    clientSecret += characters.charAt(Math.floor(Math.random() * 30));
  }

  return {
    clientId,
    clientSecret,
  };
}

// 토큰 재발급
export async function reissuanceToken() {
  const session = await getServerSession(authOptions);
  const { clientId, clientSecret } = await generateToken();
  await client.apiToken.update({
    where: {
      userEmail: session?.user?.email || "",
    },
    data: {
      clientId,
      clientSecret,
    },
  });

  revalidatePath("/management");
}

// 토큰 upsert
export async function createApiToken(email: string) {
  const { clientId, clientSecret } = await generateToken();

  return await client.apiToken.upsert({
    where: {
      userEmail: email,
    },
    create: {
      userEmail: email,
      clientId,
      clientSecret,
    },
    update: {
      clientId,
      clientSecret,
    },
  });
}

// Get 토큰
export async function getApiToken(email?: string) {
  const session = await getServerSession(authOptions);
  return await client.apiToken.findUnique({
    where: {
      userEmail: session?.user?.email || email,
    },
  });
}

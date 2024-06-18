"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import client from "@/utils/prisma/client";
import { redirect } from "next/navigation";
import { createApiToken } from "./api-token";

export interface UserProps {
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  purpose: string;
  redirectUri: string;
  device: string;
  etcDevice?: string;
  isPlannedSubscribe: boolean | string;
}

//
export async function updateUser(user: UserProps) {
  try {
    const updateUser = await client.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: user.name,
        phone: user.phone,
        purpose: user.purpose,
        redirectUri: user.redirectUri,
        device: user.device,
        isPlannedSubscribe: user.isPlannedSubscribe === "used" ? true : false,
      },
      select: {
        email: true,
      },
    });

    const createToken = await createApiToken(user.email);

    return updateUser && createToken;
  } catch (error) {
    console.log(error);
    redirect("/error");
  }
}

//
export async function getUser() {
  try {
    const session = await getServerSession(authOptions);

    return await client.apiToken.findUnique({
      where: {
        userEmail: session?.user?.email || "",
      },
    });
  } catch (error) {
    console.log(error);
    redirect("/error");
  }
}

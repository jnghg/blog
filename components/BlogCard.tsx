import * as React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostCardProps } from "@/types/post";
import { Separator } from "./ui/separator";
import { BlogCardAvartar } from "./BlogCardAvatar";
import Link from "next/link";

export function BlogCard({ title, date, image, name }: PostCardProps) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="bg-gray-500 h-40" />
        <CardDescription className="font-bold text-xl text-black">
          {title}
        </CardDescription>
      </CardHeader>
      <Separator className="" />
      <div className="py-2 ml-5">
        <BlogCardAvartar imageUrl={image || ""} name={name || ""} />
      </div>
    </Card>
  );
}

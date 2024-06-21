import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function BlogCardAvartar({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="flex text-center items-center gap-2">
      <Avatar className="w-5 h-5 hover:cursor-pointer hover:ring-1">
        <AvatarImage src={imageUrl || ""} alt="avatar" />
        <AvatarFallback />
      </Avatar>
      <div className="text-sm">{name}</div>
    </div>
  );
}

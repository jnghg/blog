"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function BlogPost({ title, content }: any) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 max-w-6xl gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[300px]",
      },
    },
  });

  return (
    <div className="w-full max-w-6xl px-4">
      <div className="py-4 w-full text-3xl text-center">{title}</div>
      <EditorContent
        style={{ whiteSpace: "pre-line", maxWidth: "1152px" }}
        editor={editor}
      />
    </div>
  );
}

"use client";

import { createPost } from "@/app/api/post";
import Toolbar from "@/components/TipTabToolbar";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogWrite() {
  const router = useRouter();

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 max-w-6xl gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // 저장
  const onSave = async () => {
    const result = await createPost({ title, content });
    if (result) router.push("/blog");
  };

  return (
    <form action={onSave} className="w-full max-w-6xl px-4">
      <Toolbar editor={editor} content={content} />
      <div className="py-4 px-4 w-full">
        <input
          className="outline-none py-4 w-full text-3xl text-center"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <EditorContent
        style={{ whiteSpace: "pre-line", maxWidth: "1152px" }}
        editor={editor}
      />
    </form>
  );
}

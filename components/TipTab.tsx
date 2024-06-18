"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./TipTabToolbar";
import { useState } from "react";

const Tiptap = () => {
  const [content, setContent] = useState<string>("");
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

  return (
    <div className="w-full max-w-6xl px-4">
      <Toolbar editor={editor} />
      <EditorContent
        style={{ whiteSpace: "pre-line", maxWidth: "1152px" }}
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;

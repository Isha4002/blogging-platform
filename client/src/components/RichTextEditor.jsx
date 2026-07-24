import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== (value || "")) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-3 bg-gray-100">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("blockquote")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          ❝ Quote
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("codeBlock")
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          {"</>"}
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;
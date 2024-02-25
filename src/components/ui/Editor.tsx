"use client";

import useEditor from "@/hooks/use-editor";
import TextareaAutosize from "react-textarea-autosize";

interface EditorProps {
  communityId: string;
  isModalOpen: boolean;
}

const Editor = ({ communityId, isModalOpen }: EditorProps) => {
  const { onSubmit, handleSubmit, rest, titleRef, _titleRef } =
    useEditor(communityId);

  return (
    <div className="w-full p-4 rounded-lg border-zinc-200 flex items-center justify-center">
      <form
        id="community-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);

              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl md:text-4xl font-bold focus:outline-none"
          />
          <div
            id="editor"
            className={`
              ${isModalOpen ? "h-[10rem]" : "min-h-[45vh] md:min-h-[35vh]"}
            `}
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;

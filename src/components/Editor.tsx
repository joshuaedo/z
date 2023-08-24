"use client"

import TextareaAutosize from "react-textarea-autosize";

const Editor = () => {
  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border-zinc-200">
      <form id="community-post-form" className="w-fit" onSubmit={() => {}}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize placeholder="title" className="w-full resize-none" />
        </div>
      </form>
    </div>
  );
};

export default Editor;

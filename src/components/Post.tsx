"use client";
import Editor from "@/components/Editor";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/Button";

interface SubmitPostProps {
  params: {
    slug: string;
  };
  community: {
    id: string;
  };
}

const SubmitPost = ({ params, community }: SubmitPostProps) => {
  return (
    <Modal modalContainer="max-w-2xl" showModal={false}>
      <div className="flex flex-col items-start gap-4 md:gap-6">
        <div className="border-b border-gray-200 pb-5">
          <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
              Create Post
            </h3>
            <p className="ml-2 mt-1 truncate text-sm text-gray-500s">
              in z/{params.slug}
            </p>
          </div>
        </div>

        <Editor communityId={community.id} />

        <div className="w-full flex justify-end">
          <Button type="submit" className="w-full" form="community-post-form">
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitPost;

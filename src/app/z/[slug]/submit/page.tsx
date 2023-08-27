import Editor from "@/components/Editor";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface SubmitPageProps {
    params: {
        slug: string;
    };
}

const SubmitPage = async ({ params }: SubmitPageProps) => {

const community = await db.community.findFirst({
    where: {
        name: params.slug
    }
})

if(!community) return notFound()
    
    return (
        <Modal modalContainer='max-w-4xl' showModal={false}>
        <div className="flex flex-col items-start gap-4 md:gap-6">
           <div className="border-b border-gray-200 pb-5">
            <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
             <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">Create Post</h3>
             <p className="ml-2 mt-1 truncate text-sm text-gray-500s">in z/{params.slug}</p>
          </div>
         </div> 

         <Editor communityId={community.id} />

         <div className="w-full flex justify-end">
            <Button type="submit" className="w-full" form="community-post-form">Post</Button>
         </div>
        </div>
        </Modal>
    );
};

export default SubmitPage;
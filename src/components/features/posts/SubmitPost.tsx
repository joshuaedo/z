'use client';
import Editor from '@/components/ui/Editor';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface SubmitPostProps {
  params: {
    slug: string;
  };
  community: {
    id: string;
  };
}

const SubmitPost = ({ params, community }: SubmitPostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const modalContent = (
    <div className={`flex flex-col items-start gap-4 md:gap-6`}>
      <div
        className={`border-b border-gray-200 pb-5 ${
          !isModalOpen && 'flex md:justify-center w-full'
        }`}
      >
        <div className={`-ml-2 -mt-2 flex flex-wrap items-baseline`}>
          <h3 className='ml-2 mt-2 text-base font-semibold leading-6'>
            Create Post
          </h3>
          <p className='ml-2 mt-1 truncate text-sm '>in z/{params.slug}</p>
        </div>
      </div>

      <Editor communityId={community.id} isModalOpen={isModalOpen} />

      <div className={isModalOpen ? 'w-full' : 'w-full flex justify-end pb-20'}>
        <Button
          type='submit'
          className={isModalOpen ? 'w-full' : 'w-[50%] md:w-[25%]'}
          form='community-post-form'
        >
          Post
        </Button>
      </div>
    </div>
  );

  return isModalOpen ? (
    <Modal modalContainer='max-w-2xl' showMax toggleModal={toggleModal}>
      <div className='pt-8'>{modalContent}</div>
    </Modal>
  ) : (
    modalContent
  );
};

export default SubmitPost;

"use client"

import Modal from '@/components/Modal';
import SignUp from '@/components/SignUp';
import { useRouter } from 'next/navigation';

const SignUpModal= () => {
  const router = useRouter();
  const toggleModal = () => {
    router.refresh()
  }
  
    return (
       <Modal modalContainer='max-w-lg' showMax toggleModal={toggleModal}>
         <SignUp/>
       </Modal>
    );
};

export default SignUpModal;
"use client"

import Modal from '@/components/Modal';
import SignIn from '@/components/SignIn';
import { useRouter } from 'next/navigation';

const SignInModal= () => {
  const router = useRouter();
  const toggleModal = () => {
    router.refresh()
  }

    return (
       <Modal modalContainer='max-w-lg' showMax toggleModal={toggleModal}>
         <SignIn/>
       </Modal>
    );
};

export default SignInModal;
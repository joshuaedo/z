"use client"

import Modal from '@/components/Modal';
import SignIn from '@/components/SignIn';
import { useRouter } from 'next/navigation';

const SignInModal= () => {
  const router = useRouter();

    return (
       <Modal modalContainer='max-w-lg' showMax toggleModal={()=> {
        router.refresh()
       }}>
         <SignIn/>
       </Modal>
    );
};

export default SignInModal;
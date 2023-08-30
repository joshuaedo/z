"use client"

import Modal from '@/components/Modal';
import SignUp from '@/components/SignUp';
import { useRouter } from 'next/navigation';

const SignUpModal= () => {
  const router = useRouter();

    return (
       <Modal modalContainer='max-w-lg' showMax toggleModal={()=> {
        router.refresh()
       }}>
         <SignUp/>
       </Modal>
    );
};

export default SignUpModal;
import Modal from '@/components/Modal';
import SignIn from '@/components/SignIn';

const SignInModal= () => {
    return (
       <Modal modalContainer='max-w-lg'>
         <SignIn/>
       </Modal>
    );
};

export default SignInModal;
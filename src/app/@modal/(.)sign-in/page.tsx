import Modal from '@/components/Modal';
import SignIn from '@/components/SignIn';

const SignInModal= () => {
    return (
       <Modal modalContainer='max-w-lg' showMobileModal>
         <SignIn/>
       </Modal>
    );
};

export default SignInModal;
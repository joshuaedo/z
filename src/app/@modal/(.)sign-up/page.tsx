import Modal from '@/components/Modal';
import SignUp from '@/components/SignUp';

const SignUpModal= () => {
    return (
       <Modal modalContainer='max-w-lg' showMobileModal>
         <SignUp/>
       </Modal>
    );
};

export default SignUpModal;
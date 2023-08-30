import Modal from '@/components/Modal';
import SignIn from '@/components/SignIn';

const SignInModal= () => {
    return (
       <Modal modalContainer='max-w-lg' showMax={false}>
         <SignIn/>
       </Modal>
    );
};

export default SignInModal;
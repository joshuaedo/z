import Modal from '@/components/modal/Modal';
import SignIn from '@/components/auth/SignIn';

const SignInModal = () => {
  return (
    <Modal modalContainer='max-w-lg' showMax={false}>
      <SignIn />
    </Modal>
  );
};

export default SignInModal;

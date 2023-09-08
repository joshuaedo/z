import Modal from '@/components/modal/Modal';
import SignUp from '@/components/auth/SignUp';

const SignUpModal = () => {
  return (
    <Modal modalContainer='max-w-lg' showMax={false}>
      <SignUp />
    </Modal>
  );
};

export default SignUpModal;

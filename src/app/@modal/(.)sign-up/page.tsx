import SignUp from '@/components/features/auth/SignUp';
import Modal from '@/components/ui/Modal';

const SignUpModal = () => {
  return (
    <Modal modalContainer='max-w-lg' showMax={false}>
      <SignUp />
    </Modal>
  );
};

export default SignUpModal;

import SignIn from '@/components/features/auth/SignIn';
import Modal from '@/components/ui/Modal';

const SignInModal = () => {
  return (
    <Modal modalContainer='max-w-lg' showMax={false}>
      <SignIn />
    </Modal>
  );
};

export default SignInModal;

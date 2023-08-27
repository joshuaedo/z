import CloseModal from "./CloseModal";
import { FC } from "react";

interface ModalProps {
  modalContainer: string;
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ modalContainer, children }) => {
  return (
    <div className={`fixed inset-0 bg-zinc-900/20 z-10`}>
      <div
        className={`container flex items-center h-full ${modalContainer} justify-center`}
      >
        <div className={`relative bg-white h-fit py-20 px-2 rounded-lg`}>
          <div className={`absolute top-4 right-4`}>
            <CloseModal />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

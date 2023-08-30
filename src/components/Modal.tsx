"use client";
import ModalHeader from "./ModalHeader";
import { FC } from "react";

interface ModalProps {
  modalContainer: string;
  children: React.ReactNode;
  showMax: boolean;
  toggleModal: Function;
}

const Modal: FC<ModalProps> = ({ modalContainer, children, showMax, toggleModal }) => {
  return (
        <div className={`fixed inset-0 bg-zinc-900/20 z-10`}>
          <div
            className={`container flex items-center h-full ${modalContainer} justify-center`}
          >
            <div
              className={`relative bg-white h-fit pt-12 pb-8 px-3 rounded-lg`}
            >
                <ModalHeader showMax={showMax} toggleModal={toggleModal} />
              {children}
            </div>
          </div>
        </div>
  );
};

export default Modal;

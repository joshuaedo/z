"use client";
import ModalHeader from "./ModalHeader";
import { FC } from "react";

interface ModalProps {
  modalContainer: string;
  children: React.ReactNode;
  showMax: boolean;
  toggleModal?: any;
}

const Modal: FC<ModalProps> = ({
  modalContainer,
  children,
  showMax,
  toggleModal,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-slate-50 dark:bg-[#0A0A0A] bg-opacity-30 dark:bg-opacity-20 z-[9999]`}
    >
      <div
        className={`container flex items-center h-full ${modalContainer} justify-center`}
      >
        <div
          className={`relative bg-white dark:bg-[#000000] shadow dark:border border-[#333333] h-fit pt-8 dark:pt-7 pb-8 px-3 rounded-lg`}
        >
          <ModalHeader showMax={showMax} toggleModal={toggleModal} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

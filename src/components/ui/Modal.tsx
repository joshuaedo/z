"use client";

import { FC } from "react";
import { Maximize2, X } from "lucide-react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

interface ModalProps {
  modalContainer: string;
  children: React.ReactNode;
  showMax?: boolean;
  toggleModal?: any;
  isModalInterceptor?: boolean;
}

const Modal: FC<ModalProps> = ({
  modalContainer,
  children,
  showMax,
  toggleModal,
  isModalInterceptor = true,
}) => {
  const router = useRouter();
  return (
    <div
      className={`fixed inset-0 bg-slate-50 dark:bg-[#0A0A0A] z-[9999] ${isModalInterceptor ? "bg-opacity-30 dark:bg-opacity-20" : "bg-opacity-60 dark:bg-opacity-60 py-8"}`}
    >
      <div
        className={`container flex items-center h-full ${modalContainer} justify-center`}
      >
        <div
          className={`relative bg-white dark:bg-[#000000] shadow dark:border border-[#333333]  ${isModalInterceptor ? "h-fit" : "w-full h-full flex justify-center items-center"} pt-8 dark:pt-3 pb-8 px-3 rounded-lg`}
        >
          {showMax && (
            <Button
              onClick={toggleModal}
              variant="ghost"
              className="h-6 w-6 p-0 rounded-md absolute top-4 left-3"
              aria-label="toggle modal"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={() => {
              isModalInterceptor ? router.back() : toggleModal();
            }}
            variant="ghost"
            className="h-6 w-6 p-0 rounded-md absolute top-4 right-3"
            aria-label="close modal"
          >
            <X className="h-4 w-4" />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

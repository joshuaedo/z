"use client";
import useDeviceSize from "@/hooks/use-device-size";
import CloseModal from "./CloseModal";
import { FC } from "react";

interface ModalProps {
  modalContainer: string;
  children: React.ReactNode;
  showModal: boolean;
}

const Modal: FC<ModalProps> = ({ modalContainer, children, showModal }) => {
  const [width, height] = useDeviceSize();
  const isMobile = width <= 767;
  return (
    <>
      {isMobile && !showModal ? (
        <div className="">{children}</div>
      ) : (
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
      )}
    </>
  );
};

export default Modal;

"use client";

import { Maximize2, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ModalHeaderProps {
  showMax: boolean;
  toggleModal: any;
}

const ModalHeader: FC<ModalHeaderProps> = ({ showMax, toggleModal }) => {
  const router = useRouter();

  return (
    <>
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
          router.back();
        }}
        variant="ghost"
        className="h-6 w-6 p-0 rounded-md absolute top-4 right-3"
        aria-label="close modal"
      >
        <X className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ModalHeader;

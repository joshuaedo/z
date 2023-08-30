"use client"

import { Maximize2, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ModalHeaderProps {
    showMax: boolean;
    toggleModal: Function;
}

const ModalHeader: FC<ModalHeaderProps> = ({showMax, toggleModal}) => {
const router = useRouter();

    return (
          <div className={`absolute top-4 w-full flex justify-between`}>
            { showMax &&
                 <Button
            onClick={toggleModal()}
            variant="subtle"
            className="h-6 w-6 p-0 rounded-md pl-3"
            aria-label="toggle modal"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>}

               <Button onClick={() => {
                        router.back()
                    }} variant="subtle" className="h-6 w-6 p-0 rounded-md pr-3" aria-label="close modal">
                    <X className="h-4 w-4" />
                     </Button>
                  </div>
      
    );
};

export default ModalHeader;
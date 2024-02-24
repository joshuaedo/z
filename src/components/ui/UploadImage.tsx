"use client";

import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { buttonVariants } from "./Button";
import Loader from "./Loader";
import Image from "next/image";
import { ImagePlusIcon } from "lucide-react";
import { useState } from "react";

interface UploadImageProps {
  name: string;
  image?: React.JSX.Element;
  setImage?: React.Dispatch<React.SetStateAction<React.JSX.Element>>;
}

type UploadResponse = {
  name: string;
  size: number;
  key: string;
  serverData: any;
  url: string;
}[];

const UploadImageButton: React.FC<UploadImageProps> = ({
  name,
  image,
  setImage,
}) => {
  const { setValue } = useFormContext();

  const handleUploadComplete = (res?: UploadResponse | undefined) => {
    if (res && res.length > 0) {
      const fileUrl = res[0].url;

      setValue(name, fileUrl);

      if (setImage) {
        setImage(
          <Image src={fileUrl} height={200} width={200} alt={res[0].name} />,
        );
      }
    }
  };

  return (
    <UploadButton
      content={{
        button({ ready }) {
          if (ready) {
            return image;
          } else {
            return <Loader />;
          }
        },
      }}
      appearance={{
        button: cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
          "cursor-pointer bg-transparent text-black dark:text-black dark:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none dark:hover:bg-zinc-200",
        ),
        allowedContent: "hidden",
      }}
      className={""}
      endpoint="imageUploader"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(`ERROR! ${err.message}`)}
    />
  );
};

const DropZone: React.FC<UploadImageProps> = ({ name }) => {
  const { setValue } = useFormContext();

  const [dropZone, setDropZone] = useState({
    uploadIcon: <ImagePlusIcon className="h-20 w-20" />,
    buttonText: "Upload Image",
    isButtonDisabled: false,
    label: "",
  });

  const { uploadIcon, buttonText, isButtonDisabled, label } = dropZone;

  const handleUploadComplete = (res?: UploadResponse | undefined) => {
    if (res && res.length > 0) {
      const fileUrl = res[0].url;

      setValue(name, fileUrl);

      setDropZone({
        uploadIcon: (
          <Image src={fileUrl} height={200} width={200} alt={res[0].name} />
        ),
        buttonText: "Image uploaded",
        isButtonDisabled: true,
        label: "",
      });
    }
  };

  return (
    <UploadDropzone
      content={{
        button({}) {
          return buttonText;
        },
        uploadIcon() {
          return uploadIcon;
        },
        label() {
          return label;
        },
      }}
      appearance={{
        container: "cursor-ponter",
        button: cn(
          buttonVariants({
            variant: "outline",
          }),
          `bg-transparent text-black dark:text-white ${isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`,
        ),
        uploadIcon: cn(
          buttonVariants({
            variant: "ghost",
          }),
        ),
        allowedContent: "hidden",
      }}
      endpoint="imageUploader"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(err)}
    />
  );
};

export { UploadImageButton, DropZone };

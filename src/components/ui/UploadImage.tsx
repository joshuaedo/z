"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@uploadthing/react";

interface UploadImageProps {

}

const UploadImageButton: React.FC<UploadImageProps> = ({}) => {
  return (
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(
          res?: { fileUrl: string; fileKey: string }[] | undefined
        ) => console.log(res)}
        onUploadError={(err) => console.log(err)}
      />
  );
};

const DropZone: React.FC<UploadImageProps> = ({}) => {
    return (
        <UploadDropzone<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(
            res?: { fileUrl: string; fileKey: string }[] | undefined
          ) => console.log(res)}
          onUploadError={(err) => console.log(err)}
        />
    );
  };
  



export { UploadImageButton, DropZone };

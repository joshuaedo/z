"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@uploadthing/react";

interface UploadImageProps {}

const UploadImage: React.FC<UploadImageProps> = () => {
  return (
    <div className="flex items-center justify-center">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(
          res?: { fileUrl: string; fileKey: string }[] | undefined
        ) => console.log(res)}
        onUploadError={(err) => console.log(err)}
      />
      <UploadDropzone<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(
          res?: { fileUrl: string; fileKey: string }[] | undefined
        ) => console.log(res)}
        onUploadError={(err) => console.log(err)}
      />
    </div>
  );
};

export default UploadImage;

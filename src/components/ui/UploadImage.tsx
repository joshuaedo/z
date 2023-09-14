"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useFormContext } from "react-hook-form";

interface UploadImageProps {
  name: string;
}

const UploadImageButton: React.FC<UploadImageProps> = ({ name }) => {
  const { register, setValue } = useFormContext(); // Get form context

  // Handle the upload completion
  const handleUploadComplete = (
    res?: { fileUrl: string; fileKey: string }[] | undefined
  ) => {
    if (res && res.length > 0) {
      // Extract the file URL from the response
      const fileUrl = res[0].fileUrl;

      // Set the value of the registered field in your form
      setValue(name, fileUrl);
    }
  };

  return (
    <UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(err)}
    />
  );
};

const DropZone: React.FC<UploadImageProps> = ({ name }) => {
  const { register, setValue } = useFormContext(); // Get form context

  // Handle the upload completion
  const handleUploadComplete = (
    res?: { fileUrl: string; fileKey: string }[] | undefined
  ) => {
    if (res && res.length > 0) {
      // Extract the file URL from the response
      const fileUrl = res[0].fileUrl;

      // Set the value of the registered field in your form
      setValue(name, fileUrl);
    }
  };

  return (
    <UploadDropzone<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(err)}
    />
  );
};

export { UploadImageButton, DropZone };

import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();

import { UploadButton, UploadDropzone } from "@uploadthing/react";

export { UploadButton, UploadDropzone } 

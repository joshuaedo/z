'use client';

import { UploadDropzone, UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { buttonVariants } from './Button';

interface UploadImageProps {
  name: string;
}

type UploadResponse = {
  name: string;
  size: number;
  key: string;
  serverData: any;
  url: string;
}[];

const UploadImageButton: React.FC<UploadImageProps> = ({ name }) => {
  const { register, setValue } = useFormContext(); // Get form context

  // Handle the upload completion
  const handleUploadComplete = (res?: UploadResponse | undefined) => {
    if (res && res.length > 0) {
      // Extract the file URL from the response
      const fileUrl = res[0].url;

      // Set the value of the registered field in your form
      setValue(name, fileUrl);
    }
  };

  return (
    <UploadButton
      content={{
        button({ ready }) {
          if (ready) return <ImageIcon />;
        },
      }}
      appearance={{
        button: cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
          }),
          'cursor-pointer bg-transparent text-black dark:text-black dark:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none dark:hover:bg-zinc-200'
        ),
        allowedContent: 'hidden',
      }}
      className={''}
      endpoint='imageUploader'
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(`ERROR! ${err.message}`)}
    />
  );
};

const DropZone: React.FC<UploadImageProps> = ({ name }) => {
  const { register, setValue } = useFormContext(); // Get form context

  // Handle the upload completion
  const handleUploadComplete = (res?: UploadResponse | undefined) => {
    if (res && res.length > 0) {
      // Extract the file URL from the response
      const fileUrl = res[0].url;

      // Set the value of the registered field in your form
      setValue(name, fileUrl);
    }
  };

  return (
    <UploadDropzone
      endpoint='imageUploader'
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(err) => console.log(err)}
    />
  );
};

export { UploadImageButton, DropZone };

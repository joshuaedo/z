'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { FC } from 'react';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  {
    ssr: false,
  }
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    // @ts-ignore
    <Output
      style={style}
      data={content}
      className='text-sm'
      renderers={renderers}
    />
  );
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className='relative w-full min-h-[15rem]'>
      <Image alt='' src={src} className='object-contain' fill />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className='rounded-md p-4'>
      <code className='text-foreground text-sm'>{data.code}</code>
    </pre>
  );
}

export default EditorOutput;

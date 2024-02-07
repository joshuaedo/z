import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';

const ConversationBackground = ({}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const darkMode = 'hidden dark:flex';
  const lightMode = 'flex dark:hidden';
  const generalStyles = 'max-h-[calc(100svh-88px)] object-cover w-full';

  return (
    <div>
      {isDesktop ? (
        <>
          <Image
            src='/chat-doodle-faint-light-md.png'
            height={1920}
            width={2560}
            alt='chat doodle light'
            className={`${generalStyles} ${lightMode}`}
          />
          <Image
            src='/chat-doodle-faint-dark-md.png'
            height={1920}
            width={2560}
            alt='chat doodle dark'
            className={`${generalStyles} ${darkMode}`}
          />
        </>
      ) : (
        <>
          <Image
            src='/chat-doodle-faint-light-sm.png'
            height={2560}
            width={1280}
            alt='chat doodle light'
            className={`${generalStyles} ${lightMode}`}
          />
          <Image
            src='/chat-doodle-faint-dark-sm.png'
            height={2560}
            width={1280}
            alt='chat doodle dark'
            className={`${generalStyles} ${darkMode}`}
          />
        </>
      )}
    </div>
  );
};

export default ConversationBackground;

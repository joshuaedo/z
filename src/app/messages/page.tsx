import Message from '@/components/features/messages/Message';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

const MessagesPage = async ({}) => {
  const session = await getAuthSession();

  const conversations = await db.conversation.findMany({
    where: {
      participantIds: {
        contains: session?.user.id,
      },
    },
    include: {
      lastMessage: {
        include: {
          recipient: true,
          author: true,
        },
      },
    },
  });

  if (!conversations) {
    return (
      <main>
        <div className='rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] md:px-8 pb-8 pt-4 space-y-2'>
          <ul className='space-y-3'>
            <li className='w-full text-xs py-3 flex items-center justify-center'>
              <span>- no messages yet -</span>
            </li>
          </ul>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className='rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] md:px-2 pb-8 pt-4 space-y-2'>
        <ul className='space-y-3'>
          {conversations?.map(({ id, lastMessage }, index) => (
            <li key={`${id}_${index}_x`}>
              <Message message={lastMessage} userId={session?.user.id} />
            </li>
          ))}
        </ul>
      </div>
      <li className='w-full text-xs py-3 flex items-center justify-center'>
        <span>- your messages show up here -</span>
      </li>
    </main>
  );
};

export default MessagesPage;

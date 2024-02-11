import Conversation from '@/components/features/messages/conversation/Conversation';
import ConversationHeader from '@/components/features/messages/conversation/ConversationHeader';
import ConversationInput from '@/components/features/messages/conversation/ConversationInput';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserByUsername } from '@/lib/user';

interface ConversationPageProps {
  params: {
    username: string;
  };
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
  const { username } = params;

  const session = await getAuthSession();

  const user = await getUserByUsername(username);

  const conversation = await db.conversation.findFirst({
    where: {
      participantIds:
        `${session?.user?.id}_${user?.id}` ||
        `${user?.id}_${session?.user?.id}`,
    },
    include: {
      messages: {
        include: {
          author: true,
          recipient: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return (
    <main className='flex-1 justify-between flex flex-col h-[calc(100svh-1rem)] md:h-[calc(100svh-4rem)] relative'>
      {/* <ConversationHeader user={user} /> */}
      <Conversation conversation={conversation} />
      <ConversationInput authorId={session?.user.id} />
    </main>
  );
};

export default ConversationPage;

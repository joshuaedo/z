import Conversation from '@/components/features/messages/conversation/Conversation';
import ConversationInput from '@/components/features/messages/conversation/ConversationInput';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserByUsername } from '@/lib/user';
import { generateParticipantIds } from '@/lib/message';

interface ConversationPageProps {
  params: {
    username: string;
  };
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
  const { username } = params;

  const session = await getAuthSession();

  const user = await getUserByUsername(username);

  const participantIds = await generateParticipantIds(
    session?.user?.id,
    user?.id
  );

  const conversation = await db.conversation.findFirst({
    where: {
      participantIds,
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
    <main className='flex-1 justify-between flex flex-col h-[calc(100svh-0.8rem)] md:h-[calc(100svh-8rem)] relative'>
      <Conversation conversation={conversation} />
      <ConversationInput authorId={session?.user.id} />
    </main>
  );
};

export default ConversationPage;

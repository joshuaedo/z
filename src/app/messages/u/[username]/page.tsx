import Conversation from '@/components/conversation/Conversation';
import ConversationHeader from '@/components/conversation/ConversationHeader';
import ConversationInput from '@/components/conversation/ConversationInput';
import { db } from '@/lib/db';

interface ConversationPageProps {
  params: {
    username: string;
  };
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
  const { username } = params;

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  const displayName =
    user?.displayName ?? user?.name ?? user?.username ?? 'zUser';

  return (
    <div className='-mt-[6rem] md:-mt-[3.7rem] pt-[2rem] max-h-[81svh] md:max-h-[98svh]'>
      {user && user.image && user.name && (
        <ConversationHeader
          displayName={displayName}
          image={user?.image}
          name={user?.name}
        />
      )}
      <Conversation />
      <ConversationInput />
    </div>
  );
};

export default ConversationPage;
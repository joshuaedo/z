import Conversation from '@/components/features/messages/Conversation';
import CreateMessage from '@/components/features/messages/CreateMessage';
import { getAuthSession } from '@/lib/auth';

const ConversationPage = async () => {
  const session = await getAuthSession();
  return (
    <>
      <Conversation />
      <div className='px-2 md:px-0'>
        <CreateMessage authorId={session?.user.id} />
      </div>
    </>
  );
};

export default ConversationPage;

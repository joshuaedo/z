import Conversation from "@/components/features/messages/conversation/Conversation";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserByUsername } from "@/lib/user";
import { getParticipantIds } from "@/lib/message";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ConversationPageProps): Promise<Metadata> {
  const { username } = params;

  const user = await getUserByUsername(username);

  const displayName = user?.displayName ?? user?.name;

  const userMetaName = user?.username ?? username;

  const title =
    userMetaName !== undefined
      ? `${displayName} (u/${userMetaName}) • Z`
      : "guest / Z";

  const description = "Message " + `${displayName} on Z.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png"],
    },
  };
}

interface ConversationPageProps {
  params: {
    username: string;
  };
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
  const { username } = params;

  const session = await getAuthSession();

  const user = await getUserByUsername(username);

  const participantIds = await getParticipantIds(session?.user?.id, user?.id);

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
          createdAt: "desc",
        },
      },
      lastMessage: {
        include: {
          author: true,
          recipient: true,
        },
      },
    },
  });

  return (
    <Conversation conversation={conversation} authorId={session?.user.id} />
  );
};

export default ConversationPage;

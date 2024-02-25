import Message from "@/components/features/messages/Message";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  let user;
  if (session) {
    user = await getUserById(session?.user?.id);
  }

  const title = `Messages • Z`;

  const description = `Read your messages on Z.`;

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
      card: "summary_large_image",
      title,
      description,
      images: [user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png"],
    },
  };
}

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

  return (
    <main>
      {conversations && (
        <div className="rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] md:px-2 pb-8 pt-4 space-y-2">
          <ul className="space-y-3">
            {conversations?.map(({ id, lastMessage }, index) => (
              <li key={`${id}_${index}_x`}>
                <Message message={lastMessage} userId={session?.user.id} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <li className="w-full text-xs py-3 flex items-center justify-center">
        <span>- your messages show up here -</span>
      </li>
    </main>
  );
};

export default MessagesPage;

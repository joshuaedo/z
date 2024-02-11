import { db } from './db';

export async function generateParticipantIds(
  id1: string | undefined,
  id2: string | undefined
) {
  const sanitizedId1 = id1 && id1.trim();
  const sanitizedId2 = id2 && id2.trim();

  const order1 = `${sanitizedId1}_${sanitizedId2}`;
  const order2 = `${sanitizedId2}_${sanitizedId1}`;

  // Check if a conversation with order1 already exists
  const existingConversation = await db.conversation.findFirst({
    where: {
      participantIds: order1,
    },
  });

  if (existingConversation) {
    // If a conversation with order1 already exists, return order1
    return order1;
  } else {
    // If no conversation with order1 exists, return order2
    return order2;
  }
}

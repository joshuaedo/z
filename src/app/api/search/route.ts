import { db } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) return new Response('Invalid query', { status: 400 });

  try {
    const [communityResults, userResults] = await Promise.all([
      db.community.findMany({
        where: {
          name: {
            startsWith: q,
          },
        },
        include: {
          _count: true,
        },
        take: 5,
      }),
      db.user.findMany({
        where: {
          username: {
            startsWith: q,
          },
        },
        include: {
          _count: true,
        },
        take: 5,
      }),
    ]);

    const results = {
      communities: communityResults,
      users: userResults,
    };

    return new Response(JSON.stringify(results));
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

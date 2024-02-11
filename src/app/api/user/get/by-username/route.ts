import { getUserByUsername } from '@/lib/user';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get('u');

  if (!username) return new Response('Invalid query', { status: 400 });

  try {
    const user = await getUserByUsername(username);

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

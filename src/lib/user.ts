import { db } from '@/lib/db';
import { User } from '@prisma/client';

type getUserOptions = {
  username?: string | undefined;
  id?: string | undefined;
  email?: string | undefined | null;
};

const getUser = async ({ username, id, email }: getUserOptions) => {
  const whereCondition = username
    ? { username }
    : id
    ? { id }
    : email
    ? { email }
    : {};

  let user: User | null;

  if (id) {
    user = await db.user.findUnique({
      where: whereCondition,
    });
  } else {
    user = await db.user.findFirst({
      where: whereCondition,
    });
  }

  return user;
};

const getUserByUsername = async (username: string | undefined) => {
  return await getUser({ username });
};

const getUserById = async (id: string | undefined) => {
  return await getUser({ id });
};

const getUserByEmail = async (email: string | undefined | null) => {
  return await getUser({ email });
};

export { getUserByUsername, getUserById, getUserByEmail, getUser };

"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Link2 } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <li className="overflow-hidden rounded-md bg-white shadow">
        <div className="h-full px-6 py-4 flex justify-between gap-6">
          <div className="relative">
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <span className="absolute bottom-0 right-0 rounded-full h-3 w-3 bg-green-500 outline outline-2 outline-white" />

            <Input
              readOnly
              onClick={() => router.push(pathname + "/submit")}
              placeholder="Create post"
            />

            <Button
              variant="ghost"
              onClick={() => router.push(pathname + "/submit")}
            />

            <Button
              variant="ghost"
              onClick={() => router.push(pathname + "/submit")}
            >
              <Link2 className="text-zinc-600" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default MiniCreatePost;

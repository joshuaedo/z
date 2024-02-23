"use client";

import UserAvatar from "../user/UserAvatar";
import { buttonVariants } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn, formatTimeToNow } from "@/lib/utils";
import { NotificationClientProps } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { startTransition, useState } from "react";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { ReadNotificationPayload } from "@/validators/notification";

const NotificationClient = ({
  id,
  icon,
  href,
  isRead,
  sender,
  createdAt,
  children,
  text,
}: NotificationClientProps) => {
  const [url] = useState(href);
  const router = useRouter();
  const { loginToast } = useCustomToast();

  const { mutate: readNotification } = useMutation({
    mutationFn: async () => {
      const payload: ReadNotificationPayload = {
        notificationId: id,
      };
      await axios.patch("/api/notifications/read", payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Action failed",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.push(url);
      });
    },
  });

  return (
    <div className="rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]">
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-full h-full justify-start font-normal cursor-pointer",
        )}
        onClick={() => readNotification()}
      >
        <div className="flex gap-6">
          {icon}
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex items-center">
              <Link href={`/u/${sender?.username}`}>
                <UserAvatar
                  user={{
                    name: sender?.name || null,
                    image: sender?.image || null,
                  }}
                  className="h-6 w-6"
                />
              </Link>
              <div className="ml-2 flex items-center gap-x-2">
                <p className="text-xs">
                  {sender?.displayName ?? sender?.name} {text}
                </p>
                {createdAt && (
                  <p className="hidden md:flex max-h-40 truncate text-xs text-muted-foreground">
                    {formatTimeToNow(new Date(createdAt))}
                  </p>
                )}
                {!isRead && (
                  <span className="bg-purple-500 w-2 h-2 rounded-full" />
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationClient;

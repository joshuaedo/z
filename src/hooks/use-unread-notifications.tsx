import { UnreadNotifications } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const useUnreadNotifications = (href: string) => {
  const { data: unreadNotifications } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/unread-notifications`);
      return data as UnreadNotifications;
    },
    queryKey: ["unread-notifications"],
    enabled: true,
  });

  const [notificationBadge, setNotificationBadge] = useState<React.ReactNode>(
    <span />,
  );

  const nbClassName =
    "absolute top-1 right-1 bg-purple-500 w-5 h-5 p-1 border-2 border-white dark:border-black rounded-full flex items-center justify-center font-bold text-2xs";

  useEffect(() => {
    switch (href) {
      case "/":
        if (unreadNotifications?.isNewHomeFeed) {
          setNotificationBadge(<span className={nbClassName} />);
        }
        break;
      case "/communities":
        if (unreadNotifications?.isJoinedNewCommunity) {
          setNotificationBadge(<span className={nbClassName} />);
        }
        break;
      case "/explore":
        if (unreadNotifications?.isNewExploreFeed) {
          setNotificationBadge(<span className={nbClassName} />);
        }
        break;
      case "/notifications":
        if (
          unreadNotifications?.unreadNotificationsCount &&
          unreadNotifications?.unreadNotificationsCount > 0
        ) {
          setNotificationBadge(
            <span className={nbClassName}>
              {unreadNotifications?.unreadNotificationsCount}
            </span>,
          );
        }
        break;
      case "/messages":
        if (
          unreadNotifications?.unreadMessagesCount &&
          unreadNotifications?.unreadMessagesCount > 0
        ) {
          setNotificationBadge(
            <span className={nbClassName}>
              {" "}
              {unreadNotifications?.unreadMessagesCount}
            </span>,
          );
        }
        break;
    }
  }, [unreadNotifications, href]);

  return {
    notificationBadge,
    setNotificationBadge,
    unreadNotifications,
  };
};

export default useUnreadNotifications;

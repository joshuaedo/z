"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import React from "react";
import { nav } from "@/lib/nav";
import useUnreadNotifications from "@/hooks/use-unread-notifications";

const IconWrapper = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const router = useRouter();
  const { notificationBadge } = useUnreadNotifications(href);

  return (
    <div
      className={cn(
        buttonVariants({
          variant: "subtle",
          size: "icon",
        }),
        "cursor-pointer relative",
      )}
      onClick={() => router.push(href)}
    >
      {notificationBadge}
      {children}
    </div>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  const isConversationPage = pathname.includes("/messages/u/");

  return isConversationPage ? (
    <div />
  ) : (
    <nav className="inline md:hidden fixed bottom-0 inset-x-0 h-[4rem] bg-zinc-100 dark:bg-[#000000] border-t border-zinc-300 dark:border-[#333333] z-[60]">
      <div className="container h-full flex items-center justify-between px-8 relative">
        {nav.map(({ path: href, iconActive, iconInactive }) => (
          <IconWrapper key={href} href={href}>
            {pathname === href
              ? React.createElement(iconActive, { className: "h-6 w-6" })
              : React.createElement(iconInactive, { className: "h-6 w-6" })}
          </IconWrapper>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;

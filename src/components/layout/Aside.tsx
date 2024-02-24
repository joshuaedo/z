"use client";
import { Icons } from "../ui/Icons";
import UserAccountNav from "../features/user/UserAccountNav";
import { Button, buttonVariants } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CommunityAvatar from "../features/communities/CommunityAvatar";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Community, Session, User } from "@prisma/client";
import Loader from "../ui/Loader";
import React from "react";
import { nav } from "@/lib/nav";
import { NavIcons } from "./NavIcons";
import useUnreadNotifications from "@/hooks/use-unread-notifications";
interface AsideResults {
  session: Session | null;
  subs: Community[];
  user: User | null;
}

interface NavButtonProps {
  path: string;
  iconActive: React.ElementType;
  iconInactive: React.ElementType;
  label: string;
}

const Aside = () => {
  const {
    data: asideResults,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/aside`);
      return data as AsideResults;
    },
    queryKey: ["aside"],
    enabled: true,
  });
  const user = asideResults?.user;
  const subs = asideResults?.subs;
  const router = useRouter();
  const pathname = usePathname();

  const AsideNavButton = ({
    path,
    iconActive: IconActive,
    iconInactive: IconInactive,
    label,
  }: NavButtonProps) => {
    const { notificationBadge } = useUnreadNotifications(path);
    return (
      <Button
        variant="ghost"
        onClick={() => router.push(path)}
        className={`${
          pathname === path ? "font-bold" : "font-medium"
        } hidden md:flex text-xl items-end -ml-3 mb-4 relative`}
      >
        <div className="relative">
          {notificationBadge}
          {pathname === path
            ? React.createElement(IconActive, {
                className: "h-5 w-5 md:h-7 md:w-7 mr-3",
              })
            : React.createElement(IconInactive, {
                className: "h-5 w-5 md:h-7 md:w-7 mr-3",
              })}
        </div>
        {label}
      </Button>
    );
  };

  return (
    <aside className="overflow-hidden h-fit rounded-lg md:bg-white dark:md:bg-[#000000] md:shadow dark:md:border border-[#333333] md:fixed p-8 space-y-2">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer hidden md:flex items-center"
      >
        <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
      </div>

      {nav.map((button) => (
        <AsideNavButton key={button.path} {...button} />
      ))}

      <AsideNavButton
        path={`${user ? `/u/${user?.username}` : "/profile"}`}
        iconActive={NavIcons.profileActive}
        iconInactive={NavIcons.profileInactive}
        label="Profile"
      />

      <hr className="hidden md:flex" />

      {isFetching && <Loader className="md:hidden" />}

      {!isFetching && isFetched && (
        <>
          {user ? (
            <>
              <Link className="flex flex-col" href={"/u/" + user?.username}>
                <UserAccountNav user={user} />
              </Link>
              <hr />
              <div className="md:hidden space-y-3">
                <h4 className="font-medium">Your Communities</h4>
                <button
                  onClick={() => router.push("/z/create")}
                  className="text-muted-foreground flex"
                >
                  <Plus className="mr-2" />
                  <span>Create a community</span>
                </button>
                <ul
                  id="aside-communities"
                  className=" text-muted-foreground max-h-[10rem] space-y-1"
                >
                  {subs?.map((community) => (
                    <li
                      key={community.id}
                      onClick={() => router.push(`z/${community.name}`)}
                      className="py-1 flex gap-x-2 cursor-pointer overflow-hidden"
                    >
                      <CommunityAvatar
                        community={community}
                        className="h-5 w-5"
                      />
                      <span className="truncate-w-bg max-w-[80%]">
                        {`z/${community.name}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="md:hidden" />
            </>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Sign In
            </button>
          )}
        </>
      )}

      <div className="space-y-1">
        <button
          onClick={() => router.push("/privacy-policy")}
          className="block text-xs font-medium rounded-lg"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => router.push("/terms-of-service")}
          className="block text-xs font-medium rounded-lg"
        >
          Terms of Service
        </button>
      </div>

      <ThemeToggle />
    </aside>
  );
};

export default Aside;

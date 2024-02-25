"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";

const useCustomBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isLight = theme === "light";
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [bgPhoto, setBgPhoto] = useState({
    src: "",
  });

  useEffect(() => {
    switch (true) {
      case isDesktop && isLight:
        setBgPhoto({
          src: "/chat-doodle-faint-light-md.png",
        });
        break;
      case isDesktop && isDark:
        setBgPhoto({
          src: "/chat-doodle-faint-dark-md.png",
        });
        break;
      case isMobile && isLight:
        setBgPhoto({
          src: "/chat-doodle-faint-light-sm.png",
        });
        break;
      case isMobile && isDark:
        setBgPhoto({
          src: "/chat-doodle-faint-dark-sm.png",
        });
    }
  }, [isDesktop, isMobile, isLight, isDark]);

  const bgProps: CSSProperties = {
    backgroundImage: `url(${bgPhoto.src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
  };

  const BgImage = () => {
    return (
      <Image
        src={bgPhoto?.src}
        alt="Chat Doodle"
        layout="fill"
        objectFit="cover"
        className=""
      />
    );
  };

  return { bgProps, BgImage };
};

export default useCustomBackground;

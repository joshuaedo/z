"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ZoomableImageProps extends ImageProps {
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  className,
  alt,
  width,
  height,
  ...props
}) => {
  const [cursorClass, setCursorClass] = useState<string>("cursor-zoom-in");

  useEffect(() => {
    const image = document.getElementById("zoomable-image") as HTMLImageElement;
    let currentZoom = 1;
    const minZoom = 1;
    const maxZoom = 3;
    const stepSize = 0.1;

    function handleWheel(event: WheelEvent) {
      // Zoom in or out based on the scroll direction
      const direction = event.deltaY > 0 ? -1 : 1;
      zoomImage(direction);
    }

    function zoomImage(direction: number) {
      let newZoom = currentZoom + direction * stepSize;

      if (newZoom < minZoom || newZoom > maxZoom) {
        return;
      }

      currentZoom = newZoom;

      image.style.transform = `scale(${currentZoom})`;

      const newCursorClass =
        direction === 1 ? "cursor-zoom-in" : "cursor-zoom-out";

      setCursorClass(newCursorClass);
    }

    setCursorClass("cursor-zoom-in");

    image.addEventListener("wheel", handleWheel);

    return () => {
      image.removeEventListener("wheel", handleWheel);
      image.style.transform = "scale(1)";
      setCursorClass("cursor-zoom-in");
    };
  }, []);

  return (
    <Image
      id="zoomable-image"
      className={cn(className, cursorClass)}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
};

export { ZoomableImage };

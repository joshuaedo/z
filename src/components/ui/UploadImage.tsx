"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";

interface UploadImageProps {}

const UploadImage: React.FC<UploadImageProps> = () => {
  const ref = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    try {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const ImageTool = (await import("@editorjs/image")).default;

      if (!ref.current) {
        const editor = new EditorJS({
          holder: "editor",
          onReady() {
            ref.current = editor;
          },
          inlineToolbar: true,
          tools: {
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  async uploadByFile(file: File) {
                    const [res] = await uploadFiles([file], "imageUploader");
                    console.log(res);

                    return {
                      success: 1,
                      file: {
                        url: res.fileUrl,
                      },
                    };
                  },
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error initializing EditorJS:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = null;
      };
    }
  }, [isMounted, initializeEditor]);

  // Error handling (uncomment and adapt as needed)
  // useEffect(() => {
  //   if (Object.keys(errors).length) {
  //     for (const [_key, value] of Object.entries(errors)) {
  //       toast({
  //         title: 'Action Failed',
  //         description: (value as { message: string }).message,
  //         variant: 'destructive',
  //       });
  //     }
  //   }
  // }, [errors]);

  return (
    <div className="flex items-center justify-center">
      <div id="editor" />
    </div>
  );
};

export default UploadImage;

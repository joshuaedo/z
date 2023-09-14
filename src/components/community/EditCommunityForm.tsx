"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import UserAvatar from "../ui/UserAvatar";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { Users } from "lucide-react";
import { UploadButton, uploadFiles } from "@/lib/uploadthing";
import UploadImage from "../ui/UploadImage";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const FormSchema = z.object({
  name: z.string().min(3).max(21),
  description: z.string().max(50),
});

export default async function EditCommunityForm() {
  const router = useRouter();
  const { loginToast } = useCustomToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      const { data } = await axios.patch("/api/community/edit", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists",
            description: "Please choose a different community.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 412) {
          return toast({
            title: "Invalid community name",
            description: "Community name is restricted.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "Action failed",
        description: "There was an error creating your community.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        description: "Your community has been updated.",
      });
      router.refresh();
      router.push(`/z/${data}`);
    },
  });

  async function uploadByFile(file: File) {
    const [res] = await uploadFiles([file], "imageUploader");
    console.log(res);

    return {
      success: 1,
      file: {
        url: res.fileUrl,
      },
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => updateProfile(e))}
        className="space-y-5"
      >
        <div className="w-full flex justify-around items-center p-5">
          <div className="h-[9vh] md:h-[12vh] w-[9vh] md:w-[12vh] rounded-[50%]">
            <Users className="w-full h-full object-contain" />
          </div>
          <UploadImage />
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(
              res?: { fileUrl: string; fileKey: string }[] | undefined
            ) => console.log(res)}
            onUploadError={(err) => console.log(err)}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is your community called?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="What is your community about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

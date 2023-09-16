"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DropZone } from "../ui/UploadImage";
import { startTransition } from "react";
import { User } from "@prisma/client";
import { ProfileValidator } from "@/lib/validators/profile";
import UserAvatar from "../ui/UserAvatar";

interface EditProfileFormProps {
  user: User | null;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  console.log(user);

  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileValidator>>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      bio: user?.bio ?? "",
      birthday: user?.birthday ?? "",
      displayName: user?.displayName ?? user?.name ?? "",
      image: user?.image ?? "",
      link: user?.link ?? "",
      profileTheme: user?.profileTheme ?? "",
      username: user?.username ?? "",
    },
  });

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof ProfileValidator>) => {
      const { data } = await axios.patch(`/api/profile/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose another username.",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        description: "Your profile has been updated.",
      });
      startTransition(() => {
        router.push(`/u/${data}`);
        router.refresh();
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => updateProfile(e))}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="profileTheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-xs md:text-sm">
                    <SelectValue placeholder="Select a background colour for your profile." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="white">white (default)</SelectItem>
                  <SelectItem value="zinc-900">black</SelectItem>
                  <SelectItem value="purple-500">purple</SelectItem>
                  <SelectItem value="green-500">green</SelectItem>
                  <SelectItem value="zinc-500">gray</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Profile Photo{" "}
                <UserAvatar
                  user={{
                    name: user?.name || null,
                    image: user?.image || null,
                  }}
                  className="h-6 w-6"
                />
              </FormLabel>
              <FormControl>
                <DropZone {...field} />
              </FormControl>
              <FormDescription>1:1 is recommended</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a unique username." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Any nicknames?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about yourself." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Website?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input placeholder="E.g November 28" {...field} />
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

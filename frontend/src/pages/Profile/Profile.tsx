import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getProfile, updateProfile } from "@/api/auth.api";
import UserNav from "@/components/NavComponent/UserNav";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/data/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      return await getProfile();
    },
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  // Update form values when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
      });
    }
  }, [data, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (user: z.infer<typeof userSchema>) => {
      // Assuming you have an updateProfile function in your API
      return await updateProfile(user);
    },
    onSuccess: (response) => {
      toast("You have successfully updated your profile!");
      form.reset({
        firstname: response?.firstname,
        lastname: response?.lastname,
      });
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`);
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    updateProfileMutation.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 container mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground mt-2">
            Here&apos;s your profile!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="border float-right mt-3 cursor-pointer hover:bg-gray-100"
            >
              Go Back to To Do List
            </Button>
            <Button
              type="submit"
              className="border float-right mt-3 cursor-pointer hover:bg-gray-100"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;

import { formSchema } from "@/data/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarIcon } from "lucide-react";

import { getToDoById, updateToDo } from "@/api/todo.api";
import UserNav from "@/components/NavComponent/UserNav";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorities, statuses } from "@/data/data";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const TodoUpdate = () => {
  const navigate = useNavigate();
  const { task_id } = useParams<{ task_id: string }>();

  const { isPending, error, data } = useQuery({
    queryKey: ["todoDetail", task_id],
    queryFn: async () => {
      if (!task_id) return null;
      return await getToDoById(Number(task_id));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status_id: "1",
      priority_id: "1",
      description: "",
      due_date: null, // Null for optional date
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        status_id: data.status_id?.toString() || "1",
        priority_id: data.priority_id?.toString() || "1",
        description: data.description || "",
        due_date: data.due_date ? new Date(data.due_date) : null, // Reset to null if no due date
      });
    }
  },[data, form]);

  const updateTaskMutation = useMutation({
    mutationFn: updateToDo,
    onSuccess: (response) => {
      toast("You have successfully updated the task!");
      form.reset({
        title: response.title,
        status_id: response.status_id?.toString() || "1",
        priority_id: response.priority_id?.toString() || "1",
        description: response.description || "",
        due_date: response.due_date ? new Date(response.due_date) : null, // Reset to null if no due date
      });
    },
    onError: (error) => {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!task_id) {
      toast.error("Task ID is missing. Cannot update task.");
      return;
    }

    const updatedTask = {
      task_id: Number(task_id),
      title: data.title,
      status_id: Number(data.status_id),
      priority_id: Number(data.priority_id),
      description: data.description,
      due_date: data.due_date
        ? data.due_date.toISOString().split("T")[0]
        : undefined, // Convert Date to YYYY-MM-DD string or undefined
    };

    updateTaskMutation.mutate(updatedTask);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading todo details</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 container mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a form to update your task!
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Task Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row sm:space-x-20">
            <FormField
              control={form.control}
              name="status_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id.toString()}
                        >
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem
                          key={priority.id}
                          value={priority.id.toString()}
                        >
                          {priority.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date (optional)</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={(date) => field.onChange(date || null)}
                        disabled={
                          (date) => date < new Date() // Disable past dates
                        }
                        captionLayout="dropdown"
                      />
                      {field.value && (
                        <div className="p-3 border-t">
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => field.onChange(null)}
                          >
                            Clear date
                          </Button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Task Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="border float-right mt-3 cursor-pointer hover:bg-gray-100"
            >
              Go Back to To Do List
            </Button>
            <Button
              type="submit"
              className="border float-right mt-3 cursor-pointer hover:bg-gray-100"
            >
              Update Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TodoUpdate;

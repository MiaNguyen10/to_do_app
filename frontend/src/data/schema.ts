import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  status_id: z.string(),
  priority_id: z.string(),
  description: z.string().optional(),
  due_date: z.date().optional().nullable(),
});

export const userSchema = z.object({
  firstname: z.string().min(1, {
    message: "First name is required",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required",
  }),
});

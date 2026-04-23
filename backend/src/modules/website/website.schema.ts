import { z } from "zod";

export const createWebsiteSchema = z.object({
  name: z.string().min(6, "Website name must be at least 6 characters"),
  url: z.string().url("Please provide a valid URL"),
});

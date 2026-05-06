import { z } from "zod";

const eventSchema = z.object({
  type: z.enum(["REQUEST", "ERROR"]),
  status: z.number().min(100).max(599),
  method: z.string(),
  url: z.string(),
  responseTime: z.number(),
  message: z.string().optional(),
  stack: z.string().optional(),
});

export const collectSchema = z.object({
  apiKey: z.string(),
  events: z.array(eventSchema),
});

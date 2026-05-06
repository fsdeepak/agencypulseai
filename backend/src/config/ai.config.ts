import "dotenv/config";
import { ChatGoogle } from "@langchain/google";

export const model = new ChatGoogle({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API,
  maxOutputTokens: 2048,
  maxRetries: 5,
});

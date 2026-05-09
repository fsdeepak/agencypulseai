import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";

export const model = new ChatMistralAI({
  model: "codestral-2508",

  apiKey: process.env.GEMINI_API,

  temperature: 0,
});

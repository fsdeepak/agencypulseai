import { prisma } from "../config/db.config";
import { model } from "../config/ai.config"; // Ensure this is codestral-2508
import { JsonOutputParser } from "@langchain/core/output_parsers";

export async function runAiAnalysis() {
  const startTime = Date.now();
  const parser = new JsonOutputParser();

  try {
    const alerts = await prisma.alert.findMany({
      where: {
        severity: { in: ["HIGH", "CRITICAL"] },
        aiReason: null,
        aiStatus: "PENDING",
      },
      orderBy: { createdAt: "asc" },
      take: 50,
    });

    if (alerts.length === 0) return;

    await prisma.alert.updateMany({
      where: { id: { in: alerts.map((a) => a.id) } },
      data: { aiStatus: "PROCESSING" },
    });

    const grouped = alerts.reduce(
      (acc, alert) => {
        const key = `${alert.method}:${alert.url}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(alert);
        return acc;
      },
      {} as Record<string, typeof alerts>,
    );

    for (const [key, group] of Object.entries(grouped)) {
      const groupIds = group.map((a) => a.id);

      const prompt = `System: You are an expert SRE. Analyze these logs for ${key}.
        Logs: ${JSON.stringify(group.map((a) => ({ msg: a.message, stack: a.stack, responseTime: a.responseTime })))}
        Respond ONLY in JSON: {"reason": "string", "suggestion": "string"} and provide under 40 words both reason, and suggestion.`;

      try {
        const result = await model.invoke(prompt);
        const parsed = await parser.parse(result.content as string);

        await prisma.alert.updateMany({
          where: { id: { in: groupIds } },
          data: {
            aiReason: parsed.reason,
            aiSuggestion: parsed.suggestion,
            aiStatus: "COMPLETED",
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 1100));
      } catch (innerError) {
        await prisma.alert.updateMany({
          where: { id: { in: groupIds } },
          data: { aiStatus: "PENDING" },
        });
      }
    }
  } catch (error) {
    console.error("❌ CRITICAL JOB FAILURE:", error);
  }
}

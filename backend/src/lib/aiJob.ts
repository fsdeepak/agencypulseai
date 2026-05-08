import { prisma } from "../config/db.config";
import { model } from "../config/ai.config";

export async function runAiAnalysis() {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting AI Analysis Batch...`);

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

    if (alerts.length === 0) {
      console.log("No new high-severity alerts found. Skipping.");
      return;
    }

    await prisma.alert.updateMany({
      where: { id: { in: alerts.map((a) => a.id) } },
      data: { aiStatus: "PROCESSING" },
    });

    const grouped: Record<string, any[]> = {};
    alerts.forEach((a) => {
      const key = `${a.method}:${a.url}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(a);
    });

    // 4. Process each group
    for (const key in grouped) {
      const group = grouped[key];
      const groupIds = group.map((a) => a.id);

      const alertSample = group.map((a) => ({
        message: a.message,
        statusCode: a.status,
        timestamp: a.createdAt,
      }));

      const prompt = `Analyze the following system alerts: ${JSON.stringify(alertSample)}. 
          Provide a root cause (reason) and a suggestion for a fix. 
          CRITICAL CONSTRAINTS:
          1. The "reason" must be under 40 words.
          2. The "suggestion" must be under 40 words.
          3. Respond ONLY in valid JSON format: {"reason": "string", "suggestion": "string"}`;

      try {
        const result = await model.invoke(prompt);

        const rawContent =
          typeof result.content === "string"
            ? result.content
            : JSON.stringify(result.content);

        const cleanedJson = rawContent
          .replace(/```(?:json)?\n?|```/g, "")
          .trim();

        const parsed = JSON.parse(cleanedJson);

        await prisma.alert.updateMany({
          where: { id: { in: groupIds } },
          data: {
            aiReason: parsed.reason || "Analysis completed",
            aiSuggestion:
              parsed.suggestion || "No specific suggestion provided",
            aiStatus: "COMPLETED",
          },
        });

        console.log(`✅ Completed ${group.length} alerts for ${key}`);

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (innerError: any) {
        console.error(
          `⚠️ AI failed for ${key}: ${innerError.message}. Reverting to PENDING.`,
        );

        await prisma.alert.updateMany({
          where: { id: { in: groupIds } },
          data: { aiStatus: "PENDING" },
        });
      }
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log(`[${new Date().toISOString()}] Batch finished in ${duration}s`);
  } catch (error: any) {
    console.error("❌ CRITICAL JOB FAILURE:", error.message);
  }
}

if (require.main === module) {
  runAiAnalysis()
    .then(async () => {
      await prisma.$disconnect();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

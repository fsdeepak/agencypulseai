import { prisma } from "../config/db.config";
import { model } from "../config/ai.config";

setInterval(async () => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  // 1. Fetch unanalyzed high-severity alerts from the last minute
  const alerts = await prisma.alert.findMany({
    where: {
      severity: "HIGH",
      aiReason: null,
      createdAt: { gte: oneMinuteAgo },
    },
  });

  if (alerts.length === 0) return;

  // 2. Group alerts by Method and URL to analyze patterns
  const grouped: Record<string, any[]> = {};
  alerts.forEach((a) => {
    const key = `${a.method}:${a.url}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(a);
  });

  for (const key in grouped) {
    const group = grouped[key];

    // FIX: Use parentheses ({}) to implicitly return the object in map
    const alertSample = group.map((a) => ({
      message: a.message,
      statusCode: a.status,
      timestamp: a.createdAt,
    }));

    const prompt = `
      Analyze these related high-severity system alerts for route ${key}:
      ${JSON.stringify(alertSample, null, 2)}
      
      Provide a concise "reason" for the spike and a "suggestion" for the fix.
      Respond strictly in valid JSON format. Do not include markdown code blocks.
      JSON structure: {"reason": "...", "suggestion": "..."}
    `;

    try {
      const result = await model.invoke(prompt);

      // LangChain returns content in 'content'. Handle possible string/array types.
      const rawContent =
        typeof result.content === "string"
          ? result.content
          : JSON.stringify(result.content);

      // FIX: Clean the response to remove Markdown backticks (```json ... ```)
      const cleanedJson = rawContent.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleanedJson);
      const { reason, suggestion } = parsed;

      // 3. Batch update the alerts with AI insights
      await prisma.alert.updateMany({
        where: { id: { in: group.map((a) => a.id) } },
        data: {
          aiReason: reason,
          aiSuggestion: suggestion,
        },
      });
    } catch (error) {}
  }
}, 60 * 1000);

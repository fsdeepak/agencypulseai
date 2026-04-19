import "dotenv/config"; // Ensure this is at the VERY top
import app from "./src/app";
import { connectDB } from "./src/config/db.config";

const PORT: number = Number(process.env.PORT);

const server = app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? "development"}`);
  await connectDB();
});

// ─── Graceful Shutdown ───────────────────────────────────────────────────────
const shutdown = (signal: string) => {
  console.log(`\n Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

"use client";
import React from "react";
import Footer from "@/components/footer/footer";
import Link from "next/link";
export default function NodeInstallationPage() {
  const apiKey = "abc123_your_unique_key";

  return (
    <>
      <div className="min-h-screen bg-[#13131b] text-white py-24 px-6 text-slate-900">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-3 uppercase tracking-tighter text-xs">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Integration Guide
              </div>
              <Link href="/doc/frontend">
                <div className="btn px-2 py-2 rounded">For Frontend</div>
              </Link>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4">
              Connect your Node server
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Install our lightweight middleware to monitor your API
              performance, track status codes, and measure response times in
              real-time.
            </p>
          </header>

          {/* API Key Section */}
          <div className="group relative bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-12 transition-all hover:border-blue-300">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Your Secret API Key
            </h3>
            <div className="flex items-center justify-between font-mono">
              <span className="text-xl text-blue-600 font-semibold">
                {apiKey}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-12">
            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Add the middleware (JS)
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Paste this code into your Express or Node.js entry point
                    (e.g., <code className="text-blue-600">index.js</code> or{" "}
                    <code className="text-blue-600">app.js</code>). Ensure it is
                    placed before your route definitions.
                  </p>

                  {/* Code Window */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        middleware/tracker.js
                      </span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                      <code className="text-blue-300">
                        {`const axios = require("axios");

const API_URL = "http://yourapp.com/collect";
const API_KEY = "abc123_your_unique_key";

const queue = [];
const INTERVAL = 20000;

async function sendBatch(events) {
  try {
    await axios.post(
      API_URL,
      {
        apiKey: API_KEY,
        events,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    queue.unshift(...events);
  }
}

function trackingMiddleware(req, res, next) {
  const start = Date.now();
  let capturedBody = null;
  let alreadyLogged = false;

  const originalSend = res.send;
  res.send = function (body) {
    if (!capturedBody) capturedBody = body;
    return originalSend.apply(res, arguments);
  };

  const originalJson = res.json;
  res.json = function (body) {
    capturedBody = body;
    return originalJson.apply(res, arguments);
  };

  const logEvent = (terminatedEarly) => {
    if (alreadyLogged) return;
    alreadyLogged = true;

    let finalMessage = "";
    let finalStack = "";

    if (capturedBody) {
      if (typeof capturedBody === "object") {
        finalMessage = capturedBody.message || capturedBody.error || JSON.stringify(capturedBody);
        finalStack = capturedBody.stack || "";
      } else {
        try {
          const parsed = JSON.parse(capturedBody);
          finalMessage = parsed.message || parsed.error || capturedBody;
          finalStack = parsed.stack || "";
        } catch (e) {
          finalMessage = capturedBody.toString();
        }
      }
    } else {
      finalMessage = res.statusMessage || "";
    }

    const event = {
      type: "REQUEST",
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
      responseTime: Date.now() - start,
      message: finalMessage,
      stack: finalStack,
      terminated: terminatedEarly,
    };

    queue.push(event);
  };

  res.on("finish", () => logEvent(false));
  res.on("close", () => logEvent(!res.writableFinished));

  next();
}

setInterval(async () => {
  if (queue.length === 0) return;
  const events = queue.splice(0, queue.length);
  await sendBatch(events);
}, INTERVAL);

async function flushOnExit() {
  if (queue.length > 0) {
    await sendBatch([...queue]);
  }
}

process.on("SIGINT", async () => {
  await flushOnExit();
  process.exit();
});

process.on("SIGTERM", async () => {
  await flushOnExit();
  process.exit();
});`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Add the middleware (TS)
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Paste this code into your Express or Node.js entry point
                    (e.g., <code className="text-blue-600">index.ts</code> or{" "}
                    <code className="text-blue-600">app.ts</code>). Ensure it is
                    placed before your route definitions.
                  </p>

                  {/* Code Window */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        middleware/tracker.ts
                      </span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                      <code className="text-blue-300">
                        {`import axios from "axios";

type EventType = {
  type: string;
  status: number;
  method: string;
  url: string;
  responseTime: number;
  message?: string;
  stack?: string;
  terminated: boolean;
};

const API_URL = "http://yourapp.com/collect";
const API_KEY = "abc123_your_unique_key";

const queue: EventType[] = [];
const INTERVAL = 20000;

async function sendBatch(events: EventType[]) {
  try {
    await axios.post(
      API_URL,
      {
        apiKey: API_KEY,
        events,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err: any) {
    queue.unshift(...events);
  }
}

export function trackingMiddleware(req: any, res: any, next: any) {
  const start = Date.now();
  let capturedBody: any = null;
  let alreadyLogged = false;

  const originalSend = res.send;
  res.send = function (body: any): any {
    if (!capturedBody) capturedBody = body;
    return originalSend.apply(res, arguments as any);
  };

  const originalJson = res.json;
  res.json = function (body: any): any {
    capturedBody = body;
    return originalJson.apply(res, arguments as any);
  };

  const logEvent = (terminatedEarly: boolean) => {
    if (alreadyLogged) return;
    alreadyLogged = true;

    let finalMessage = "";
    let finalStack = "";

    if (capturedBody) {
      if (typeof capturedBody === "object") {
        finalMessage =
          capturedBody.message ||
          capturedBody.error ||
          JSON.stringify(capturedBody);
        finalStack = capturedBody.stack || "";
      } else {
        try {
          const parsed = JSON.parse(capturedBody);
          finalMessage = parsed.message || parsed.error || capturedBody;
          finalStack = parsed.stack || "";
        } catch {
          finalMessage = capturedBody.toString();
        }
      }
    } else {
      finalMessage = res.statusMessage || "";
    }

    const event: EventType = {
      type: "REQUEST",
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
      responseTime: Date.now() - start,
      message: finalMessage,
      stack: finalStack,
      terminated: terminatedEarly,
    };

    queue.push(event);
  };

  res.on("finish", () => logEvent(false));
  res.on("close", () => logEvent(!res.writableFinished));

  next();
}

setInterval(async () => {
  if (queue.length === 0) return;
  const events = queue.splice(0, queue.length);
  await sendBatch(events);
}, INTERVAL);

async function flushOnExit() {
  if (queue.length > 0) {
    await sendBatch([...queue]);
  }
}

process.on("SIGINT", async () => {
  await flushOnExit();
  process.exit();
});

process.on("SIGTERM", async () => {
  await flushOnExit();
  process.exit();
});`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">Setup in Express</h2>
                  <p className="text-slate-500 mb-6">
                    Use this inside your App file.
                  </p>

                  {/* Tracker Component */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 mb-4 shadow-xl">
                    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        app.js / app.ts
                      </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-300">
                      {`import express from "express";
import { trackingMiddleware } from "./tracker";

const app = express();

app.use(trackingMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1 pt-1">
                  <h2 className="text-xl font-bold mb-2">Verify connection</h2>
                  <p className="text-slate-500 mb-4">
                    Restart your server and hit any endpoint. We'll
                    automatically detect your first event.
                  </p>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Waiting for incoming data...
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

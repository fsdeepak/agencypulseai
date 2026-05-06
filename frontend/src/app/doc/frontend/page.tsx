"use client";
import React from "react";
import Footer from "@/components/footer/footer";
import Link from "next/link";
export default function page() {
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
              <Link href="/doc">
                <div className="btn px-2 py-2 rounded">For Backend</div>
              </Link>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4">
              Connect your Frontend
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
                    Create a file at{" "}
                    <code className="text-blue-600">utils/errorTracker.js</code>{" "}
                    to handle the core logic.
                  </p>

                  {/* Code Window */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        utils/errorTracker.js
                      </span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                      <code className="text-blue-300">
                        {`const API_KEY = "website_api_key";
const COLLECTOR_URL = "http://localhost:8000/api/collect";

export function initGlobalTracking() {
  if (typeof window === "undefined" || window._trackingInitialized) return;

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    let [url, options = {}] = args;

    // Don't track requests sent TO the collector (prevents infinite loops)
    if (url === COLLECTOR_URL) {
      return originalFetch(url, options);
    }

    const start = Date.now();

    try {
      const res = await originalFetch(url, options);
      const responseTime = Date.now() - start;

      // Fire and forget (don't await to avoid slowing down the UI)
      originalFetch(COLLECTOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: API_KEY,
          events: [
            {
              type: "REQUEST",
              status: res.status,
              method: options.method || "GET",
              url: url.toString(),
              responseTime,
            },
          ],
        }),
      }).catch((err) => console.error("Tracker failed to report:", err));

      return res;
    } catch (err) {
      const responseTime = Date.now() - start;

      originalFetch(COLLECTOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: API_KEY,
          events: [
            {
              type: "ERROR",
              status: 500,
              method: options.method || "GET",
              url: url.toString(),
              responseTime,
              message: err.message,
              stack: err.stack,
            },
          ],
        }),
      }).catch((err) => console.error("Tracker failed to report error:", err));

      throw err;
    }
  };

  window._trackingInitialized = true;
}
`}
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
                    Create a file at{" "}
                    <code className="text-blue-600">utils/errorTracker.ts</code>{" "}
                    to handle the core logic.
                  </p>

                  {/* Code Window */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        utils/errorTracker.ts
                      </span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                      <code className="text-blue-300">
                        {`/** 
 * Extend the global Window interface to include our tracking flag 
 */
declare global {
  interface Window {
    _trackingInitialized?: boolean;
  }
}

const API_KEY: string = "website_api_key";
const COLLECTOR_URL: string = "http://localhost:8000/api/collect";

/**
 * Types for the telemetry data sent to the collector
 */
interface BaseEvent {
  method: string;
  url: string;
  responseTime: number;
}

interface RequestSuccessEvent extends BaseEvent {
  type: "REQUEST";
  status: number;
}

interface RequestErrorEvent extends BaseEvent {
  type: "ERROR";
  status: 500;
  message: string;
  stack?: string;
}

type TrackingPayload = {
  apiKey: string;
  events: (RequestSuccessEvent | RequestErrorEvent)[];
};

export function initGlobalTracking(): void {
  // 1. SSR Check and Duplicate Initialization Guard
  if (typeof window === "undefined" || window._trackingInitialized) return;

  const originalFetch = window.fetch;

  // 2. Monkey-patch the fetch function
  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const url = input.toString();
    const method = init?.method || "GET";

    // Prevent infinite loops by not tracking requests to the collector itself
    if (url === COLLECTOR_URL) {
      return originalFetch(input, init);
    }

    const start = Date.now();

    try {
      const res = await originalFetch(input, init);
      const responseTime = Date.now() - start;

      // Fire and forget success telemetry
      sendTelemetry({
        apiKey: API_KEY,
        events: [
          {
            type: "REQUEST",
            status: res.status,
            method,
            url,
            responseTime,
          },
        ],
      });

      return res;
    } catch (err) {
      const responseTime = Date.now() - start;
      const error = err as Error;

      // Fire and forget error telemetry
      sendTelemetry({
        apiKey: API_KEY,
        events: [
          {
            type: "ERROR",
            status: 500,
            method,
            url,
            responseTime,
            message: error.message,
            stack: error.stack,
          },
        ],
      });

      throw err;
    }
  };

  /**
   * Helper function to handle the POST request to the collector
   */
  function sendTelemetry(payload: TrackingPayload): void {
    originalFetch(COLLECTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Tracker failed to report:", err));
  }

  window._trackingInitialized = true;
}`}
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
                  <h2 className="text-xl font-bold mb-2">Setup in Next.js</h2>
                  <p className="text-slate-500 mb-6">
                    Create a client component to initialize the tracker and
                    include it in your root layout.
                  </p>

                  {/* Tracker Component */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 mb-4 shadow-xl">
                    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        components/Tracker.tsx / .jsx
                      </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-300">
                      {`"use client";
import { useEffect } from "react";
import { initGlobalTracking } from "@/utils/errorTracker";

export default function Tracker() {
  useEffect(() => {
    initGlobalTracking();
  }, []);

  return null;
}
`}
                    </pre>
                  </div>

                  {/* Layout Component */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        app/layout.tsx / .jsx
                      </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-300">
                      {`import Tracker from "@/components/Tracker";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Tracker />
        {children}
      </body>
    </html>
  );
}`}
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
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Setup in React (CRA/Vite)
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Wrap your application routes with the Tracker component
                    inside your main App file.
                  </p>

                  {/* Tracker Component */}
                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 mb-4 shadow-xl">
                    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        components/Tracker.tsx / .jsx
                      </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-300">
                      {`import { useEffect } from "react";
import { initGlobalTracking } from "@/utils/errorTracker";

export default function Tracker() {
  useEffect(() => {
    initGlobalTracking();
  }, []);

  return null;
}
`}
                    </pre>
                  </div>

                  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        App.tsx / .jsx
                      </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-300">
                      {`import { BrowserRouter } from "react-router-dom";
import Tracker from "@/components/Tracker";

function App() {
  return (
    <BrowserRouter>
      <Tracker />
      {/* your routes and components */}
    </BrowserRouter>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
                  5
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

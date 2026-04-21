import React from "react";

const cta = () => {
  return (
    <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-[#6c3bf5]/15 blur-[100px]" />
        <div className="w-[400px] h-[300px] rounded-full bg-[#00d4ff]/8 blur-[80px] absolute" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent mb-5 leading-tight">
          Ready to get full visibility into your app?
        </h2>
        <p className="text-lg text-[#cac3d9] mb-10">
          Join thousands of teams shipping faster and more confidently. No
          credit card needed.
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold rounded-2xl bg-gradient-to-r from-[#6c3bf5] to-[#00d4ff] text-white shadow-[0_0_60px_rgba(108,59,245,0.5)] hover:shadow-[0_0_80px_rgba(108,59,245,0.7)] hover:scale-105 transition-all duration-200"
        >
          Start for Free — No Credit Card Needed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
        <p className="mt-6 text-xs text-[#494456]">
          Free tier includes 1M events/month · No infrastructure to manage ·
          Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default cta;

import React from "react";

const footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0d0d16] px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          {/* Brand */}
          <div className="text-center">
            <a href="/" className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xl">⚡</span>
              <span className="font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent">
                AgencyPulse AI
              </span>
            </a>
            <p className="text-sm text-center text-[#948ea2] leading-relaxed max-w-xs">
              The synthetic monitoring platform built for high-performance
              engineering teams.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#494456]">
            © 2026 AgencyPulse AI. All rights reserved.
          </p>
          <p className="text-xs text-[#494456]">
            Made with 💜 by the AgencyPulse AI team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;

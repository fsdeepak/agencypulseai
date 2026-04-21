"use client";

import LeftSide from "./_components/leftSide";
import RightSide from "./_components/rightSide";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#6c3bf5]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00d4ff]/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#6c3bf5]/5 blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(108,59,245,0.15)]">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

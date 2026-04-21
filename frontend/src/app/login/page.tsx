"use client";

import RightSide from "./_components/rightSide";
import LeftSide from "./_components/leftSide";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-150px] right-[-150px] w-[550px] h-[550px] rounded-full bg-[#6c3bf5]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[450px] h-[450px] rounded-full bg-[#00d4ff]/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#6c3bf5]/5 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(108,59,245,0.12)]">
        <LeftSide />

        <RightSide />
      </div>
    </div>
  );
}

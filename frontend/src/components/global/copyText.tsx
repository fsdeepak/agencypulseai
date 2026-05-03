"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa6";

interface CopyTextProps {
  text: string;
}

export const CopyText = ({ text }: CopyTextProps) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
    >
      {copy ? (
        <FaCheckDouble className="h-4 w-4 text-emerald-400 animate-in fade-in zoom-in duration-300" />
      ) : (
        <IoCopyOutline className="h-4 w-4 text-[#cac3d9] group-hover:text-white transition-colors" />
      )}
    </button>
  );
};

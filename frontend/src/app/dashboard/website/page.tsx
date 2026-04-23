"use client";
import { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const isPending = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, url);
  };
  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] font-sans antialiased pt-30">
      <div className="pb-10">
        <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent max-w-4xl mx-auto">
          Add Your Website
        </h2>

        <p className="text-center">Please enter your website name and url</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-96">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2"
              >
                Website Name
              </label>
              <div className="relative group">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Agency Pulse AI"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="url"
                className="block text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2"
              >
                Website URL
              </label>
              <div className="relative group">
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.agencypulseai.dev/"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              id="createAccountBtn"
              type="submit"
              disabled={isPending}
              className="cursor-pointer w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white btnColor shadow-[0_0_30px_rgba(108,59,245,0.4)] hover:shadow-[0_0_50px_rgba(108,59,245,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_30px_rgba(108,59,245,0.4)] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Adding Website...
                </>
              ) : (
                "Add Website"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;

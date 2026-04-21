"use client";

import { useState } from "react";
import { useResetPasswordVerification } from "@/hooks/auth.hook";

const MailIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const page = () => {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useResetPasswordVerification();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    mutate({ email });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] font-sans antialiased pt-30">
      <div className="pb-10">
        <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent max-w-4xl mx-auto">
          Forget Password
        </h2>

        <p className="text-center">
          Please enter your registered email address for forget password
        </p>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-96">
          <form onSubmit={handleReset} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#494456] group-focus-within:text-[#6c3bf5] transition-colors duration-200">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
                />
              </div>
            </div>
            <button
              id="signInBtn"
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6c3bf5] to-[#00d4ff] shadow-[0_0_30px_rgba(108,59,245,0.4)] hover:shadow-[0_0_50px_rgba(108,59,245,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                  Sending Email...
                </>
              ) : (
                <>
                  Send Email
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
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
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;

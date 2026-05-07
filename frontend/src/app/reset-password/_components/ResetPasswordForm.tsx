"use client";

import { useState } from "react";
import { useSetPassword } from "@/hooks/auth.hook";
import { useSearchParams } from "next/navigation";
import { LockIcon, EyeIcon } from "@/components/ui/Icons";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPw] = useState(false);

  const { mutate, isPending } = useSetPassword();

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ password, token });
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] font-sans antialiased pt-30">
      <div className="pb-10">
        <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent max-w-4xl mx-auto">
          Reset Password
        </h2>

        <p className="text-center">Please enter your new password</p>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-96">
          <form onSubmit={handleSetPassword} className="space-y-5">
            <div>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#494456] group-focus-within:text-[#6c3bf5] transition-colors duration-200">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#494456] hover:text-[#ccbeff] transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>
            <button
              id="signInBtn"
              type="submit"
              disabled={isPending}
              className="w-full btn"
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
                  Save...
                </>
              ) : (
                <>
                  Save
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

export default ResetPasswordForm;

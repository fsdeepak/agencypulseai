"use client";

import { useGetMe } from "@/hooks/auth.hook";
import { useLogout } from "@/hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";

const nav = () => {
  const queryClient = useQueryClient();
  const { data } = useGetMe();

  const { mutate } = useLogout();

  const user = data?.user;

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["user"], null);
      },
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#13131b]/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-lg bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent">
              AgencyPulse AI
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[#cac3d9]">
            <a
              href="#features"
              className="hover:text-[#ccbeff] transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#sdk"
              className="hover:text-[#ccbeff] transition-colors duration-200"
            >
              Docs
            </a>
          </div>

          {/* CTA Buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <a
                onClick={handleLogout}
                className="hidden md:block cursor-pointer px-4 py-2 text-sm text-[#cac3d9] border border-white/10 rounded-lg hover:border-[#6c3bf5]/50 hover:text-[#ccbeff] transition-all duration-200"
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="hidden md:block px-4 py-2 text-sm text-[#cac3d9] border border-white/10 rounded-lg hover:border-[#6c3bf5]/50 hover:text-[#ccbeff] transition-all duration-200"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#6c3bf5] to-[#00d4ff] text-white shadow-[0_0_24px_rgba(108,59,245,0.5)] hover:shadow-[0_0_32px_rgba(108,59,245,0.7)] hover:scale-105 transition-all duration-200"
              >
                Get Started Free
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default nav;

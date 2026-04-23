"use client";

import React, { useState } from "react";
import { useLogin, useResendVerification } from "../../../hooks/auth.hook";
import Link from "next/link";
import LoginUser from "./loginUser";
import ResendVerificationLink from "./resendVerificationLink";

const rightSide = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPw] = useState(false);
  const [view, setView] = useState<"login" | "resend">("login");

  const { mutate: loginMutate, isPending: loginIsPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutate(
      { email, password },
      {
        onError: (error: any) => {
          if (
            error?.response?.status === 403 ||
            error?.response?.data?.message === "Email not verified"
          ) {
            setView("resend");
          }
        },
      },
    );
  };
  const { mutate: ResendMutate, isPending: ResendIsPending } =
    useResendVerification();

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { email };

    ResendMutate(payload);

    setView("login");
  };
  return (
    <div className="flex flex-col justify-center p-8 md:p-12 bg-[#13131b]/90 backdrop-blur-xl border border-white/8 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl">
      {/* Mobile logo */}
      <a href="/" className="flex items-center gap-2 mb-8 lg:hidden">
        <span className="text-xl">⚡</span>
        <span className="font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent">
          AgencyPulse AI
        </span>
      </a>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent mb-2">
          Sign in to your account
        </h1>
        <p className="text-sm text-[#948ea2]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#ed9f22] hover:text-[#a2e7ff] font-medium transition-colors duration-150"
          >
            Create one free
          </Link>
        </p>
      </div>
      {view === "login" ? (
        <LoginUser
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPw={setShowPw}
          isPending={loginIsPending}
        />
      ) : (
        <ResendVerificationLink
          handleResend={handleResend}
          email={email}
          setEmail={setEmail}
          isPending={ResendIsPending}
          onBack={() => setView("login")}
        />
      )}
      <p className="text-center text-xs text-[#494456] mt-6">
        🔒 256-bit encrypted &nbsp;·&nbsp; SOC2 compliant &nbsp;·&nbsp; GDPR
        ready
      </p>
    </div>
  );
};

export default rightSide;

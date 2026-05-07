"use client";
import { useState } from "react";
import Link from "next/link";
import { useRegiter } from "../../../hooks/auth.hook";
import { UserIcon, MailIcon, LockIcon, EyeIcon } from "@/components/ui/Icons";

/* ─── Password strength helper ─────────────────────────── */
function getPasswordStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "",
  "#ef4444", // red
  "#f59e0b", // amber
  "#6c3bf5", // purple
  "#00d4ff", // cyan
];

const rightSide = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(password);

  const { mutate, isPending } = useRegiter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, password };
    mutate(payload);
    setname("");
    setEmail("");
    setPassword("");
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

      {/* Form header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent mb-2">
          Create your account
        </h1>
        <p className="text-sm text-[#948ea2]">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2"
          >
            Full Name
          </label>
          <div className="relative group">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#494456] group-focus-within:text-[#6c3bf5] transition-colors duration-200">
              <UserIcon />
            </span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
            />
          </div>
        </div>

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
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2"
          >
            Password
          </label>
          <div className="relative group">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#494456] group-focus-within:text-[#6c3bf5] transition-colors duration-200">
              <LockIcon />
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              minLength={8}
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0d0d16] border border-[#494456]/30 text-[#e4e1ed] placeholder-[#494456] text-sm outline-none focus:border-[#6c3bf5]/70 focus:shadow-[0_0_0_3px_rgba(108,59,245,0.15)] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-[#494456] hover:text-[#ccbeff] transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          {/* Password strength bar */}
          {password.length > 0 && (
            <div className="mt-2.5">
              <div className="flex gap-1.5 mb-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        i <= strength ? strengthColors[strength] : "#1f1f27",
                      boxShadow:
                        i <= strength
                          ? `0 0 8px ${strengthColors[strength]}60`
                          : "none",
                    }}
                  />
                ))}
              </div>
              <p
                className="text-xs"
                style={{ color: strengthColors[strength] }}
              >
                {strengthLabels[strength]}
              </p>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          id="createAccountBtn"
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
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Sign in link */}
      <p className="text-center text-sm text-[#948ea2] mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#ccbeff] hover:text-[#a2e7ff] font-medium transition-colors duration-150"
        >
          Sign in
        </Link>
      </p>

      {/* Trust badges */}
      <p className="text-center text-xs text-[#494456] mt-5">
        🔒 256-bit encrypted &nbsp;·&nbsp; SOC2 compliant &nbsp;·&nbsp; GDPR
        ready
      </p>
    </div>
  );
};

export default rightSide;

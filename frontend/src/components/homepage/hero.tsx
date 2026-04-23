const hero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#6c3bf5]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-32 right-0 w-[500px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6c3bf5]/30 bg-[#6c3bf5]/10 text-[#ccbeff] text-xs font-medium tracking-wider uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          Now with AI-powered anomaly detection
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent max-w-4xl mx-auto">
          Know Exactly How Your App Performs — In Real Time
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#cac3d9] max-w-2xl mx-auto mb-10 leading-relaxed">
          Install our lightweight SDK in minutes. Get deep performance insights,
          error tracking, and user analytics — all in one stunning dashboard.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="/register"
            className="flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl btnColor text-white shadow-[0_0_40px_rgba(108,59,245,0.5)] hover:shadow-[0_0_60px_rgba(108,59,245,0.7)] hover:scale-105 transition-all duration-200"
          >
            Start Free Trial
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
          </a>
          <a
            href="/demo"
            className="flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/15 text-[#e4e1ed] hover:border-[#6c3bf5]/60 hover:bg-[#6c3bf5]/10 transition-all duration-200"
          >
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
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Demo
          </a>
        </div>

        {/* Social proof */}
        <p className="text-sm text-[#948ea2]">
          ✦ Trusted by{" "}
          <span className="text-[#ccbeff] font-semibold">2,000+</span>{" "}
          developers &nbsp;·&nbsp; No credit card required
        </p>

        {/* Hero Dashboard Preview */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#1f1f27]/80 backdrop-blur-sm shadow-[0_0_80px_rgba(108,59,245,0.2)] overflow-hidden">
          {/* Dashboard header bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d16]/80 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-[#494456] font-mono">
              dashboard.agencypulse.ai
            </span>
          </div>

          {/* Dashboard content mock */}
          <div className="p-6 grid grid-cols-4 gap-4 text-left">
            {/* Metric cards */}
            {[
              {
                label: "Avg Response Time",
                value: "42ms",
                change: "-8%",
                up: false,
                color: "#00d4ff",
              },
              {
                label: "Error Rate",
                value: "0.02%",
                change: "-12%",
                up: false,
                color: "#28c840",
              },
              {
                label: "Throughput",
                value: "14.2k/s",
                change: "+24%",
                up: true,
                color: "#ccbeff",
              },
              {
                label: "Apdex Score",
                value: "0.97",
                change: "+0.02",
                up: true,
                color: "#ffbd2e",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl bg-[#292932] p-4 border border-white/5"
              >
                <p className="text-xs text-[#948ea2] mb-1 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-2xl font-bold" style={{ color: m.color }}>
                  {m.value}
                </p>
                <p
                  className={`text-xs mt-1 font-medium ${m.up ? "text-[#a2e7ff]" : "text-[#ccbeff]"}`}
                >
                  {m.change} vs last hour
                </p>
              </div>
            ))}

            {/* Fake sparkline chart */}
            <div className="col-span-4 rounded-xl bg-[#1b1b23] p-4 border border-white/5 h-32 flex items-end gap-1">
              {[
                40, 56, 38, 72, 54, 88, 62, 74, 92, 68, 84, 76, 95, 78, 88, 72,
                96, 82, 74, 90, 68, 86, 94, 78,
              ].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 22
                        ? "linear-gradient(to top, #6c3bf5, #00d4ff)"
                        : "rgba(108,59,245,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;

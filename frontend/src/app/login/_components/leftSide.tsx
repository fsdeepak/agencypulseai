const sparkHeights = [
  30, 45, 38, 60, 52, 75, 58, 80, 65, 90, 72, 85, 68, 95, 78, 88, 70, 92, 76,
  84, 62, 96, 74, 88,
];
const leftSide = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0d0d16] via-[#13131b] to-[#1a0d2e] border border-white/5 border-r-0 rounded-l-3xl relative overflow-hidden">
      {/* Decorative blobs inside panel */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-[#6c3bf5]/12 blur-[70px] pointer-events-none" />
      <div className="absolute top-10 left-0 w-[200px] h-[200px] rounded-full bg-[#00d4ff]/6 blur-[60px] pointer-events-none" />

      <div className="relative">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 mb-12">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-lg bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent">
            AgencyPulse AI
          </span>
        </a>

        {/* Headline */}
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-br from-[#e4e1ed] via-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent leading-tight">
          Welcome back. Your metrics are waiting.
        </h2>
        <p className="text-sm text-[#948ea2] mb-10 leading-relaxed">
          Your dashboard updates in real-time — sign in to pick up where you
          left off.
        </p>

        {/* Live stat highlights */}
        <div className="space-y-5">
          {[
            {
              dot: "#6c3bf5",
              label: "42ms",
              desc: "avg response time across your endpoints",
            },
            {
              dot: "#00d4ff",
              label: "0 alerts",
              desc: "unresolved critical errors since last login",
            },
            {
              dot: "#a2e7ff",
              label: "99.99%",
              desc: "uptime recorded in the last 30 days",
            },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                style={{
                  backgroundColor: s.dot,
                  boxShadow: `0 0 8px ${s.dot}`,
                }}
              />
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold" style={{ color: s.dot }}>
                  {s.label}
                </span>
                <span className="text-xs text-[#948ea2]">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative sparkline */}
      <div className="relative mt-10">
        <p className="text-xs text-[#494456] uppercase tracking-widest mb-3 font-medium">
          Response time · last 24h
        </p>
        <div className="flex items-end gap-1 h-16">
          {sparkHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i >= sparkHeights.length - 3
                    ? "linear-gradient(to top, #6c3bf5, #00d4ff)"
                    : "rgba(108,59,245,0.25)",
              }}
            />
          ))}
        </div>
        {/* Bottom trust strip */}
        <p className="text-xs text-[#494456] mt-6">
          🔒 256-bit encrypted &nbsp;·&nbsp; SOC2 compliant &nbsp;·&nbsp; GDPR
          ready
        </p>
      </div>
    </div>
  );
};

export default leftSide;

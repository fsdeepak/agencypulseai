const leftSide = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0d0d16] via-[#13131b] to-[#1a0d2e] border border-white/5 border-r-0 rounded-l-3xl relative overflow-hidden">
      {/* Inner glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#6c3bf5]/15 blur-[80px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[250px] h-[250px] rounded-full bg-[#00d4ff]/8 blur-[60px] pointer-events-none" />

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
          Start monitoring your app&apos;s performance in minutes.
        </h2>
        <p className="text-sm text-[#948ea2] mb-10 leading-relaxed">
          The synthetic architect for modern infrastructure. Gain complete
          visibility into your stack with AI-driven insights.
        </p>

        {/* Bullet points */}
        <div className="space-y-6">
          {[
            {
              icon: "⚡",
              color: "#00d4ff",
              title: "Real-time performance metrics",
              desc: "Monitor latency, throughput, and errors with millisecond precision.",
            },
            {
              icon: "🔒",
              color: "#ccbeff",
              title: "Enterprise-grade security (SOC2)",
              desc: "Your data is encrypted at rest and in transit. Fully compliant.",
            },
            {
              icon: "📊",
              color: "#a2e7ff",
              title: "Trusted by 2,000+ teams",
              desc: "Join top engineering organizations shipping better software.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-[#1f1f27]"
                style={{ boxShadow: `0 0 16px ${item.color}30` }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#e4e1ed] mb-0.5">
                  {item.title}
                </p>
                <p className="text-xs text-[#948ea2] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative mt-12 pt-8 border-t border-white/5">
        <p className="text-xs text-[#494456]">
          🔒 256-bit encrypted &nbsp;·&nbsp; SOC2 compliant &nbsp;·&nbsp; GDPR
          ready
        </p>
      </div>
    </div>
  );
};

export default leftSide;

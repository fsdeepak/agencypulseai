import React from 'react'

const features = () => {
  return (
     <section id="features" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6c3bf5] mb-3">Everything you need</p>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent mb-4">
                Built for production-grade engineering
              </h2>
              <p className="text-[#cac3d9] max-w-xl mx-auto">
                From real-time telemetry to AI-powered anomaly detection — every tool is purpose-built for high-performance teams.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "⚡", title: "Real-Time Performance", desc: "Monitor response times, throughput, and latency across all endpoints with sub-50ms data freshness.", glow: "#6c3bf5" },
                { icon: "🐛", title: "Error Tracking", desc: "Catch, group, and alert on exceptions before your users notice. Full stack traces with source maps.", glow: "#00d4ff" },
                { icon: "📊", title: "User Analytics", desc: "Understand how users interact with your app. Session replays, funnels, and rage-click tracking.", glow: "#ccbeff" },
                { icon: "🔔", title: "Smart Alerts", desc: "Get notified via Slack or email the moment thresholds are breached — before SLAs are missed.", glow: "#6c3bf5" },
                { icon: "🌍", title: "Global CDN Monitoring", desc: "Track performance across 30+ regions with an interactive heatmap. Know your slowest markets instantly.", glow: "#00d4ff" },
                { icon: "🔒", title: "Secure & Compliant", desc: "SOC2 Type II ready, GDPR compliant. Data encrypted at rest and in transit with zero retention risk.", glow: "#ccbeff" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group relative rounded-2xl p-6 bg-[#1f1f27]/60 border border-white/7 hover:border-[#6c3bf5]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 0 40px rgba(108,59,245,0)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 bg-[#292932] group-hover:scale-110 transition-transform duration-200"
                    style={{ boxShadow: `0 0 16px ${f.glow}40` }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#e4e1ed] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#948ea2] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default features
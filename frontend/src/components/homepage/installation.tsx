import React from 'react'

const installation = () => {
  return (
      <section id="sdk" className="py-20 px-6 lg:px-8 bg-[#0d0d16]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent mb-3">
                Up and running in 2 minutes
              </h2>
              <p className="text-[#cac3d9]">Three commands. Zero configuration. Full visibility.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Install the SDK",
                  code: "npm install @agencypulse/sdk",
                },
                {
                  step: "02",
                  title: "Initialize with your API key",
                  code: `import AgencyPulse from '@agencypulse/sdk';\n\nAgencyPulse.init({\n  apiKey: process.env.APX_KEY,\n  environment: 'production',\n});`,
                },
                {
                  step: "03",
                  title: "Watch your dashboard light up",
                  code: "// That's it! Open your dashboard at\n// dashboard.agencypulse.ai\n// Metrics start flowing in real-time ✨",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-white/8 bg-[#13131b] p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-[#6c3bf5]/40 font-mono">{s.step}</span>
                    <h3 className="text-sm font-semibold text-[#e4e1ed]">{s.title}</h3>
                  </div>
                  <pre className="text-xs text-[#a2e7ff] font-mono bg-[#0d0d16] border-t-2 border-[#00d4ff]/30 rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {s.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default installation
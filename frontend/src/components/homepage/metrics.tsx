import React from "react";

const metrics = () => {
  return (
    <section className="py-20 px-6 lg:px-8 bg-[#0d0d16]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2,000+", label: "Developers", color: "#ccbeff" },
            { value: "99.99%", label: "Uptime SLA", color: "#00d4ff" },
            { value: "<50ms", label: "Avg Latency", color: "#a2e7ff" },
            { value: "10B+", label: "Events Tracked", color: "#ccbeff" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: m.color }}
                />
              </div>
              <p
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{
                  color: m.color,
                  textShadow: `0 0 30px ${m.color}60`,
                }}
              >
                {m.value}
              </p>
              <p className="text-sm text-[#948ea2] uppercase tracking-wider font-medium">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default metrics;

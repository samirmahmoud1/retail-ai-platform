'use client'

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { BarChart3, Brain, Sparkles, Zap, ArrowRight, TrendingUp, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, end, {
      duration,
      onUpdate: (v) => setCount(Math.floor(v)),
    })
    return controls.stop
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}))

export default function Home() {
  const router = useRouter()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8])
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8])

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* Dashboard-style background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(168,85,247,0.32),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_75%,rgba(6,182,212,0.16),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_10%_70%,rgba(244,63,94,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25),rgba(0,0,0,0.85))]" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
          transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.36) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.18, 0.45, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute right-[15%] top-[30%] h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.28) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* Side floating cards */}
      <motion.div
        animate={{ y: [0, -18, 0], rotateZ: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-6 top-40 hidden xl:block"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(168,85,247,0.42)",
          borderRadius: 16,
          padding: "18px 20px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(168,85,247,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>LIVE SESSION</span>
        </div>
        <p style={{ marginTop: 10, fontSize: 22, fontWeight: 700, color: "#fff" }}>
          +<CountUp end={2847} duration={3} />
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Active users right now</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotateZ: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute right-6 top-48 hidden xl:block"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(6,182,212,0.42)",
          borderRadius: 16,
          padding: "18px 20px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(6,182,212,0.15)",
        }}
      >
        <TrendingUp size={20} color="#06b6d4" />
        <p style={{ marginTop: 10, fontSize: 22, fontWeight: 700, color: "#fff" }}>94.2%</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Prediction accuracy</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        className="absolute bottom-40 left-8 hidden xl:block"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(244,63,94,0.35)",
          borderRadius: 16,
          padding: "16px 18px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 30px rgba(244,63,94,0.12)",
        }}
      >
        <Target size={18} color="#f43f5e" />
        <p style={{ marginTop: 8, fontSize: 18, fontWeight: 700, color: "#fff" }}>$1.2M</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Revenue recovered</p>
      </motion.div>

      {/* HERO */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 999,
            border: "1px solid rgba(168,85,247,0.5)",
            background: "rgba(168,85,247,0.1)",
            padding: "8px 18px",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c084fc",
            backdropFilter: "blur(10px)",
            marginBottom: 32,
          }}
        >
          <Sparkles size={13} />
          AI Retail Intelligence Platform
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
        </motion.div>

        <motion.style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .hero-gradient {
            background: linear-gradient(135deg, #a855f7, #06b6d4, #f43f5e, #a855f7);
            background-size: 300% 300%;
            animation: gradient-shift 4s ease infinite;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .cta-btn {
            position: relative;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .cta-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
            opacity: 0;
            transition: opacity 0.3s;
          }

          .cta-btn:hover::before { opacity: 1; }

          .cta-btn:hover {
            transform: scale(1.05) translateY(-2px);
            box-shadow: 0 20px 60px rgba(124,58,237,0.5), 0 0 120px rgba(6,182,212,0.16);
          }

          .cta-btn:active { transform: scale(0.98); }

          .prediction-btn {
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          }

          .prediction-btn:hover {
            transform: scale(1.04) translateY(-2px);
            border-color: rgba(6,182,212,0.75) !important;
            box-shadow: 0 18px 55px rgba(6,182,212,0.18);
          }

          .prediction-btn:active { transform: scale(0.98); }

          .feature-card {
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s;
          }

          .feature-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(168,85,247,0.15);
          }
        `}</motion.style>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{
            maxWidth: 900,
            fontSize: "clamp(44px, 8vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: 8,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Turn User Behavior
          <br />
          Into{" "}
          <span className="hero-gradient">Revenue Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          style={{
            marginTop: 28,
            maxWidth: 560,
            fontSize: 18,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
          }}
        >
          Analyze sessions, detect funnel friction, predict conversions, and discover what actually drives purchase decisions — in real time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{ display: "flex", gap: 14, marginTop: 44, flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            className="cta-btn"
            onClick={() => router.push("/dashboard")}
            style={{
              borderRadius: 14,
              background: "linear-gradient(135deg, #7c3aed, #0891b2)",
              border: "none",
              padding: "16px 36px",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Open Dashboard
            <ArrowRight size={16} />
          </button>

          <button
            className="prediction-btn"
            onClick={() => router.push("/prediction")}
            style={{
              borderRadius: 14,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(6,182,212,0.35)",
              padding: "16px 36px",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 32px rgba(6,182,212,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Try Prediction
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            gap: 48,
            marginTop: 60,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: 12500, suffix: "+", label: "Stores Analyzed" },
            { value: 94, suffix: "%", label: "Prediction Accuracy" },
            { value: 3, suffix: "×", label: "Avg Revenue Lift" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                <CountUp end={s.value} />
                {s.suffix}
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            maxWidth: 900,
            width: "100%",
            marginTop: 80,
          }}
        >
          {[
            {
              icon: <Brain size={22} />,
              color: "#a855f7",
              glow: "rgba(168,85,247,0.2)",
              border: "rgba(168,85,247,0.3)",
              title: "Conversion Prediction",
              text: "Identify high-intent users with ML scoring before they bounce.",
              tag: "AI-Powered",
            },
            {
              icon: <BarChart3 size={22} />,
              color: "#06b6d4",
              glow: "rgba(6,182,212,0.2)",
              border: "rgba(6,182,212,0.3)",
              title: "Funnel Analytics",
              text: "Pinpoint exactly where and why users drop before buying.",
              tag: "Real-time",
            },
            {
              icon: <Zap size={22} />,
              color: "#f59e0b",
              glow: "rgba(245,158,11,0.2)",
              border: "rgba(245,158,11,0.3)",
              title: "Actionable Insights",
              text: "Automated recommendations that turn behavior into revenue.",
              tag: "Automated",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="feature-card"
              style={{
                borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${item.border}`,
                padding: "28px 24px",
                textAlign: "left",
                backdropFilter: "blur(20px)",
                boxShadow: `0 0 60px ${item.glow}`,
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `rgba(${item.color === "#a855f7" ? "168,85,247" : item.color === "#06b6d4" ? "6,182,212" : "245,158,11"},0.15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  marginBottom: 20,
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: item.color,
                  background: `rgba(${item.color === "#a855f7" ? "168,85,247" : item.color === "#06b6d4" ? "6,182,212" : "245,158,11"},0.12)`,
                  padding: "3px 10px",
                  borderRadius: 999,
                  marginBottom: 12,
                }}
              >
                {item.tag}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ display: "flex" }}>
            {["#f43f5e", "#a855f7", "#06b6d4", "#f59e0b", "#22c55e"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid #000",
                  marginLeft: i === 0 ? 0 : -8,
                  zIndex: 5 - i,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Trusted by <strong style={{ color: "rgba(255,255,255,0.7)" }}>5,000+</strong> retail teams worldwide
          </span>
        </motion.div>
      </section>
    </main>
  )
}
'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  MousePointerClick,
  ShoppingCart,
  Sparkles,
  Target,
  Timer,
  Zap,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}))

export default function PredictionPage() {
  const [form, setForm] = useState({
    time_spent_sec: 80,
    session_length: 5,
    interaction_count: 5,
    view: 2,
    click: 1,
    add_to_cart: 1,
    wishlist: 0,
    pre_purchase_actions: 4,
    pre_purchase_engagement_score: 3,
    safe_cart_to_view_ratio: 0.33,
    conversion_intent: 2,
    safe_time_per_action: 16,
    safe_high_engagement: 0,
    device_type: "android",
    channel: "app",
    region: "UK",
    traffic_source: "organic",
  })

  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  function updateField(name: string, value: any) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handlePredict() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        error: true,
        label: "API Connection Failed",
        recommendation: "Make sure FastAPI is running on http://127.0.0.1:8000",
      })
    }

    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #06b6d4, #f43f5e, #a855f7);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        input, select {
          outline: none;
        }

        .field:hover {
          border-color: rgba(6,182,212,0.45) !important;
          box-shadow: 0 0 30px rgba(6,182,212,0.08);
        }

        .predict-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 24px 70px rgba(124,58,237,0.45), 0 0 100px rgba(6,182,212,0.16);
        }

        .result-card:hover {
          transform: translateY(-8px);
        }

        @media (max-width: 1000px) {
          .prediction-grid {
            grid-template-columns: 1fr !important;
          }

          .field-grid {
            grid-template-columns: 1fr !important;
          }

          .main-title {
            font-size: 46px !important;
          }
        }
      `}</style>

      <Background />

      <section style={styles.wrapper}>
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.header}
        >
          <div>
            <div style={styles.badge}>
              <Sparkles size={14} />
              AI Conversion Prediction
              <span style={styles.liveDot} />
            </div>

            <h1 className="main-title" style={styles.title}>
              Predict User <span className="gradient-text">Conversion</span>
            </h1>

            <p style={styles.subtitle}>
              Enter session behavior signals and let the trained model estimate whether the user is likely to purchase.
            </p>
          </div>

          <div style={styles.headerMini}>
            <Brain size={24} color="#06b6d4" />
            <p style={styles.headerMiniLabel}>Live ML Endpoint</p>
            <p style={styles.headerMiniValue}>/predict</p>
          </div>
        </motion.header>

        <div className="prediction-grid" style={styles.grid}>
          <motion.section
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={styles.formPanel}
          >
            <div style={styles.panelHeader}>
              <div style={styles.panelIcon}><Activity size={18} /></div>
              <div>
                <h2 style={styles.panelTitle}>Session Inputs</h2>
                <p style={styles.panelSub}>Behavioral and context features</p>
              </div>
            </div>

            <div className="field-grid" style={styles.fieldGrid}>
              <NumberField icon={<Timer size={16} />} label="Time Spent (sec)" name="time_spent_sec" value={form.time_spent_sec} onChange={updateField} />
              <NumberField icon={<Activity size={16} />} label="Session Length" name="session_length" value={form.session_length} onChange={updateField} />
              <NumberField icon={<MousePointerClick size={16} />} label="Interaction Count" name="interaction_count" value={form.interaction_count} onChange={updateField} />
              <NumberField icon={<Sparkles size={16} />} label="Views" name="view" value={form.view} onChange={updateField} />
              <NumberField icon={<MousePointerClick size={16} />} label="Clicks" name="click" value={form.click} onChange={updateField} />
              <NumberField icon={<ShoppingCart size={16} />} label="Add to Cart" name="add_to_cart" value={form.add_to_cart} onChange={updateField} />
              <NumberField icon={<Target size={16} />} label="Wishlist" name="wishlist" value={form.wishlist} onChange={updateField} />
              <NumberField icon={<Zap size={16} />} label="Pre-Purchase Actions" name="pre_purchase_actions" value={form.pre_purchase_actions} onChange={updateField} />
              <NumberField icon={<Brain size={16} />} label="Engagement Score" name="pre_purchase_engagement_score" value={form.pre_purchase_engagement_score} onChange={updateField} />
              <NumberField icon={<ShoppingCart size={16} />} label="Cart/View Ratio" name="safe_cart_to_view_ratio" value={form.safe_cart_to_view_ratio} step={0.01} onChange={updateField} />
              <NumberField icon={<Target size={16} />} label="Conversion Intent" name="conversion_intent" value={form.conversion_intent} onChange={updateField} />
              <NumberField icon={<Timer size={16} />} label="Time Per Action" name="safe_time_per_action" value={form.safe_time_per_action} step={0.1} onChange={updateField} />
            </div>

            <div style={styles.selectGrid}>
              <SelectField label="Device" name="device_type" value={form.device_type} options={["android", "ios", "desktop", "tablet"]} onChange={updateField} />
              <SelectField label="Channel" name="channel" value={form.channel} options={["app", "mobile", "web"]} onChange={updateField} />
              <SelectField label="Region" name="region" value={form.region} options={["UK", "JP", "CA", "BR", "US", "FR", "AU", "DE", "IN"]} onChange={updateField} />
              <SelectField label="Traffic Source" name="traffic_source" value={form.traffic_source} options={["organic", "direct", "affiliate", "paid", "social", "email", "referral"]} onChange={updateField} />
            </div>

            <button className="predict-btn" style={styles.predictBtn} onClick={handlePredict}>
              {loading ? "Analyzing Session..." : "Predict Conversion"}
              <ArrowRight size={18} />
            </button>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={styles.sidePanel}
          >
            <div style={styles.panelHeader}>
              <div style={styles.panelIcon}><Brain size={18} /></div>
              <div>
                <h2 style={styles.panelTitle}>Prediction Output</h2>
                <p style={styles.panelSub}>Model decision and business action</p>
              </div>
            </div>

            {!result ? (
              <div style={styles.emptyState}>
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={styles.emptyOrb}
                >
                  <Brain size={42} />
                </motion.div>
                <h3 style={styles.emptyTitle}>Ready to score a session</h3>
                <p style={styles.emptyText}>
                  Fill in the behavior inputs and run prediction to estimate user purchase intent.
                </p>
              </div>
            ) : result.error ? (
              <ResultError result={result} />
            ) : (
              <ResultSuccess result={result} />
            )}

            <div style={styles.logicBox}>
              <h4 style={styles.logicTitle}>How to read this</h4>
              <p style={styles.logicText}>
                Higher add-to-cart activity, stronger engagement, and better cart-to-view ratio usually increase conversion probability.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}

function NumberField({ label, name, value, onChange, icon, step = 1 }: any) {
  return (
    <div className="field" style={styles.field}>
      <div style={styles.fieldTop}>
        <span style={styles.fieldIcon}>{icon}</span>
        <label style={styles.label}>{label}</label>
      </div>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(name, Number(e.target.value))}
        style={styles.input}
      />
    </div>
  )
}

function SelectField({ label, name, value, options, onChange }: any) {
  return (
    <div className="field" style={styles.field}>
      <label style={styles.label}>{label}</label>
      <select value={value} onChange={(e) => onChange(name, e.target.value)} style={styles.select}>
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

function ResultSuccess({ result }: any) {
  const high = result.prediction === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="result-card"
      style={{
        ...styles.resultCard,
        borderColor: high ? "rgba(34,197,94,0.45)" : "rgba(244,63,94,0.45)",
        boxShadow: high ? "0 0 80px rgba(34,197,94,0.16)" : "0 0 80px rgba(244,63,94,0.16)",
      }}
    >
      <div style={{ ...styles.resultIcon, color: high ? "#22c55e" : "#f43f5e", background: high ? "rgba(34,197,94,0.12)" : "rgba(244,63,94,0.12)" }}>
        <CheckCircle2 size={32} />
      </div>

      <p style={styles.resultLabel}>{result.label}</p>

      <h3 style={styles.resultValue}>
        {result.conversion_percentage}%
      </h3>

      <p style={styles.resultText}>{result.recommendation}</p>
    </motion.div>
  )
}

function ResultError({ result }: any) {
  return (
    <div style={{ ...styles.resultCard, borderColor: "rgba(244,63,94,0.45)" }}>
      <h3 style={styles.resultLabel}>{result.label}</h3>
      <p style={styles.resultText}>{result.recommendation}</p>
    </div>
  )
}

function Background() {
  return (
    <>
      <div style={styles.radialOne} />
      <div style={styles.radialTwo} />
      <div style={styles.radialThree} />
      <div style={styles.gridBg} />

      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(168,85,247,0.45)",
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
          transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  )
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
  },
  wrapper: {
    position: "relative",
    zIndex: 5,
    width: "min(1320px, calc(100% - 48px))",
    margin: "0 auto",
    padding: "34px 0 60px",
  },
  header: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 28,
    padding: 28,
    backdropFilter: "blur(22px)",
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
    alignItems: "center",
    boxShadow: "0 35px 100px rgba(0,0,0,0.4)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    border: "1px solid rgba(168,85,247,0.45)",
    background: "rgba(168,85,247,0.1)",
    color: "#c084fc",
    padding: "8px 15px",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 12px #22c55e",
  },
  title: {
    margin: "18px 0 0",
    fontSize: 58,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    fontWeight: 800,
  },
  subtitle: {
    maxWidth: 720,
    marginTop: 16,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.7,
    fontSize: 15,
  },
  headerMini: {
    minWidth: 230,
    border: "1px solid rgba(6,182,212,0.35)",
    background: "rgba(6,182,212,0.08)",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 0 60px rgba(6,182,212,0.12)",
  },
  headerMiniLabel: {
    margin: "12px 0 0",
    color: "rgba(255,255,255,0.42)",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  headerMiniValue: {
    margin: "6px 0 0",
    fontSize: 26,
    fontWeight: 800,
  },
  grid: {
    marginTop: 22,
    display: "grid",
    gridTemplateColumns: "1.4fr 0.8fr",
    gap: 20,
  },
  formPanel: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 28,
    padding: 26,
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.36)",
  },
  sidePanel: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 28,
    padding: 26,
    backdropFilter: "blur(22px)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.36)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  panelIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    background: "rgba(168,85,247,0.12)",
    border: "1px solid rgba(168,85,247,0.35)",
    color: "#c084fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  panelTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
  },
  panelSub: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,0.38)",
    fontSize: 12,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
  },
  selectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 14,
    marginTop: 14,
  },
  field: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
    borderRadius: 18,
    padding: 14,
    transition: "0.25s ease",
  },
  fieldTop: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  fieldIcon: {
    color: "#06b6d4",
  },
  label: {
    display: "block",
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    marginBottom: 9,
    fontWeight: 700,
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 20,
    fontWeight: 800,
  },
  select: {
    width: "100%",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: 12,
    padding: "11px 12px",
    fontSize: 14,
    textTransform: "capitalize",
  },
  predictBtn: {
    marginTop: 20,
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "17px 22px",
    background: "linear-gradient(135deg, #7c3aed, #0891b2)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "0.25s ease",
    boxShadow: "0 12px 45px rgba(124,58,237,0.35)",
  },
  emptyState: {
    minHeight: 310,
    border: "1px dashed rgba(255,255,255,0.14)",
    borderRadius: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 28,
  },
  emptyOrb: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    background: "rgba(168,85,247,0.12)",
    border: "1px solid rgba(168,85,247,0.35)",
    color: "#c084fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 55px rgba(168,85,247,0.2)",
  },
  emptyTitle: {
    margin: "22px 0 0",
    fontSize: 23,
    fontWeight: 800,
  },
  emptyText: {
    margin: "10px 0 0",
    maxWidth: 320,
    color: "rgba(255,255,255,0.42)",
    lineHeight: 1.6,
    fontSize: 14,
  },
  resultCard: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.26)",
    borderRadius: 26,
    padding: 28,
    textAlign: "center",
    transition: "0.25s ease",
  },
  resultIcon: {
    width: 72,
    height: 72,
    margin: "0 auto 18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resultLabel: {
    margin: 0,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  resultValue: {
    margin: "12px 0",
    fontSize: 64,
    fontWeight: 800,
    letterSpacing: "-0.05em",
  },
  resultText: {
    margin: "0 auto",
    maxWidth: 360,
    color: "rgba(255,255,255,0.48)",
    lineHeight: 1.6,
    fontSize: 14,
  },
  logicBox: {
    border: "1px solid rgba(6,182,212,0.22)",
    background: "rgba(6,182,212,0.06)",
    borderRadius: 22,
    padding: 18,
  },
  logicTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 800,
    color: "#67e8f9",
  },
  logicText: {
    margin: "8px 0 0",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6,
    fontSize: 13,
  },
  radialOne: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(168,85,247,0.32), transparent)",
  },
  radialTwo: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 55% 45% at 85% 75%, rgba(6,182,212,0.16), transparent)",
  },
  radialThree: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 45% 35% at 10% 70%, rgba(244,63,94,0.10), transparent)",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  },
}
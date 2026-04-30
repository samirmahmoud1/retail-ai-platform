'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  Activity,
  ArrowRight,
  BarChart3,
  MousePointerClick,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Globe2,
} from "lucide-react"

const API_URL = "http://127.0.0.1:8000"

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 9 + 7,
}))

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null)
  const [funnel, setFunnel] = useState<any[]>([])
  const [actions, setActions] = useState<any[]>([])
  const [channel, setChannel] = useState<any[]>([])
  const [device, setDevice] = useState<any[]>([])
  const [region, setRegion] = useState<any[]>([])
  const [insights, setInsights] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const [s, f, a, c, d, r, i] = await Promise.all([
        fetch(`${API_URL}/analytics/summary`),
        fetch(`${API_URL}/analytics/funnel`),
        fetch(`${API_URL}/analytics/actions`),
        fetch(`${API_URL}/analytics/channel`),
        fetch(`${API_URL}/analytics/device`),
        fetch(`${API_URL}/analytics/region`),
        fetch(`${API_URL}/insights`),
      ])

      setSummary(await s.json())
      setFunnel(await f.json())
      setActions(await a.json())
      setChannel(await c.json())
      setDevice(await d.json())
      setRegion(await r.json())
      setInsights(await i.json())
    }

    load()
  }, [])

  if (!summary) {
    return (
      <main style={styles.loading}>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={styles.loader}
        >
          Loading Retail Intelligence...
        </motion.div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

        body {
          margin: 0;
          background: #000;
        }

        .chart-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 90px rgba(124, 58, 237, 0.18);
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .insight-card:hover {
          transform: translateX(8px);
          border-color: rgba(6, 182, 212, 0.45) !important;
        }

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

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .main-title {
            font-size: 44px !important;
          }
        }
      `}</style>

      <Background />

      <section style={styles.wrapper}>
        <Header summary={summary} />

        <div className="stats-grid" style={styles.statsGrid}>
          <StatCard
            icon={<Users size={19} />}
            label="Sessions"
            value={summary.total_sessions.toLocaleString()}
            caption="User journeys"
            color="#a855f7"
          />
          <StatCard
            icon={<Activity size={19} />}
            label="Events"
            value={summary.total_events.toLocaleString()}
            caption="Behavior signals"
            color="#06b6d4"
          />
          <StatCard
            icon={<TrendingUp size={19} />}
            label="Conversion"
            value={`${summary.conversion_rate}%`}
            caption="Purchase rate"
            color="#22c55e"
          />
          <StatCard
            icon={<Zap size={19} />}
            label="Drop-off"
            value={`${summary.drop_off_rate}%`}
            caption="Funnel friction"
            color="#f43f5e"
          />
        </div>

        <div className="dashboard-grid" style={styles.mainGrid}>
          <ChartCard
            title="Funnel Flow"
            subtitle="User journey from product view to purchase"
            icon={<BarChart3 size={18} />}
            style={{ gridColumn: "span 7" }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={funnel}>
                <defs>
                  <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} fill="url(#funnelFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <div style={{ gridColumn: "span 5", display: "grid", gap: 16 }}>
            <TopChannelCard summary={summary} />

            <ChartCard
              title="User Actions"
              subtitle="Event distribution"
              icon={<MousePointerClick size={18} />}
              compact
            >
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={actions} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="action" type="category" stroke="rgba(255,255,255,0.45)" fontSize={11} width={78} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#06b6d4" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="dashboard-grid" style={styles.secondGrid}>
          <ChartCard
            title="Channel Conversion"
            subtitle="Which platform converts best"
            icon={<ShoppingCart size={18} />}
          >
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={channel}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="channel" stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="conversion_rate" fill="#22c55e" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Device Conversion"
            subtitle="Mobile-first behavior"
            icon={<Activity size={18} />}
          >
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={device}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="device" stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="conversion_rate" fill="#f43f5e" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <InsightsPanel insights={insights} />
        </div>

        <ChartCard
          title="Regional Conversion Map"
          subtitle="Regional performance across markets"
          icon={<Globe2 size={18} />}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={region}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="region" stroke="rgba(255,255,255,0.35)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="conversion_rate" fill="#a855f7" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </main>
  )
}

function Header({ summary }: any) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={styles.header}
    >
      <div>
        <div style={styles.badge}>
          <Sparkles size={14} />
          Retail Behavior Analytics
          <span style={styles.liveDot} />
        </div>

        <h1 className="main-title" style={styles.title}>
          Data <span className="gradient-text">Command Center</span>
        </h1>

        <p style={styles.subtitle}>
          A premium analytics dashboard for understanding user sessions, funnel movement,
          device behavior, channel performance, and regional conversion signals.
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.04, y: -4 }}
        style={styles.headerCard}
      >
        <p style={styles.headerCardLabel}>Top Performing Channel</p>
        <div style={styles.headerCardValue}>
          {summary.top_channel}
          <ArrowRight size={18} />
        </div>
      </motion.div>
    </motion.header>
  )
}

function StatCard({ icon, label, value, caption, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="stat-card"
      style={{
        ...styles.statCard,
        boxShadow: `0 0 55px ${color}22`,
        borderColor: `${color}55`,
      }}
    >
      <div style={{ ...styles.statIcon, color, background: `${color}18`, borderColor: `${color}55` }}>
        {icon}
      </div>

      <div>
        <p style={styles.statLabel}>{label}</p>
        <h3 style={styles.statValue}>{value}</h3>
        <p style={styles.statCaption}>{caption}</p>
      </div>

      <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.25)", marginLeft: "auto" }} />
    </motion.div>
  )
}

function ChartCard({ title, subtitle, icon, children, style = {}, compact = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="chart-card"
      style={{
        ...styles.card,
        padding: compact ? 20 : 24,
        ...style,
      }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.cardIcon}>{icon}</div>
        <div>
          <h2 style={styles.cardTitle}>{title}</h2>
          <p style={styles.cardSubtitle}>{subtitle}</p>
        </div>
      </div>

      {children}
    </motion.div>
  )
}

function TopChannelCard({ summary }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -6 }}
      style={styles.topChannel}
    >
      <div style={styles.topChannelLeft}>
        <div style={styles.greenOrb}>
          <ShoppingCart size={22} />
        </div>
        <div>
          <p style={styles.topChannelLabel}>Best Conversion Surface</p>
          <h3 style={styles.topChannelValue}>{summary.top_channel}</h3>
        </div>
      </div>

      <div style={styles.topChannelArrow}>
        <ArrowRight size={20} />
      </div>
    </motion.div>
  )
}

function InsightsPanel({ insights }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={styles.insightsPanel}
    >
      <div style={styles.cardHeader}>
        <div style={styles.cardIcon}>
          <Sparkles size={18} />
        </div>
        <div>
          <h2 style={styles.cardTitle}>Business Insights</h2>
          <p style={styles.cardSubtitle}>What the data is telling us</p>
        </div>
      </div>

      <div style={styles.insightsList}>
        {insights.slice(0, 4).map((item: any, index: number) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="insight-card"
            style={styles.insightCard}
          >
            <div>
              <h4 style={styles.insightTitle}>{item.title}</h4>
              <p style={styles.insightText}>{item.description}</p>
            </div>
            <ArrowRight size={15} style={{ color: "#06b6d4", flexShrink: 0 }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Background() {
  return (
    <>
      <div style={styles.radialOne} />
      <div style={styles.radialTwo} />
      <div style={styles.radialThree} />
      <div style={styles.grid} />

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

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 7, repeat: Infinity }}
        style={styles.orbOne}
      />

      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1.5 }}
        style={styles.orbTwo}
      />
    </>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div style={styles.tooltip}>
      <p style={{ color: "#fff", fontWeight: 800, margin: 0 }}>{label}</p>
      <p style={{ color: "#06b6d4", margin: "6px 0 0" }}>
        {payload[0].name}: {payload[0].value}
      </p>
    </div>
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
  loading: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  loader: {
    color: "#c084fc",
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  wrapper: {
    position: "relative",
    zIndex: 5,
    width: "min(1380px, calc(100% - 48px))",
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
  headerCard: {
    minWidth: 255,
    border: "1px solid rgba(0,200,150,0.35)",
    background: "rgba(0,200,150,0.08)",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 0 60px rgba(0,200,150,0.12)",
  },
  headerCardLabel: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    margin: 0,
  },
  headerCardValue: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 30,
    fontWeight: 800,
    textTransform: "capitalize",
  },
  statsGrid: {
    marginTop: 22,
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 16,
  },
  statCard: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 20,
    padding: 18,
    backdropFilter: "blur(22px)",
    display: "flex",
    alignItems: "center",
    gap: 14,
    transition: "0.25s ease",
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statLabel: {
    margin: 0,
    color: "rgba(255,255,255,0.38)",
    fontSize: 11,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    fontWeight: 800,
  },
  statValue: {
    margin: "4px 0 0",
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.04em",
  },
  statCaption: {
    margin: "3px 0 0",
    color: "rgba(255,255,255,0.32)",
    fontSize: 12,
  },
  mainGrid: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gap: 18,
  },
  secondGrid: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
  },
  card: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 24,
    backdropFilter: "blur(22px)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.32)",
    transition: "0.3s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "rgba(168,85,247,0.12)",
    border: "1px solid rgba(168,85,247,0.35)",
    color: "#c084fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  cardSubtitle: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,0.38)",
    fontSize: 12,
  },
  topChannel: {
    border: "1px solid rgba(0,200,150,0.35)",
    background: "rgba(0,200,150,0.075)",
    borderRadius: 24,
    padding: 24,
    backdropFilter: "blur(22px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 0 70px rgba(0,200,150,0.12)",
  },
  topChannelLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  greenOrb: {
    width: 50,
    height: 50,
    borderRadius: 16,
    background: "rgba(0,200,150,0.14)",
    border: "1px solid rgba(0,200,150,0.35)",
    color: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topChannelLabel: {
    margin: 0,
    color: "rgba(255,255,255,0.42)",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 800,
  },
  topChannelValue: {
    margin: "5px 0 0",
    fontSize: 28,
    fontWeight: 800,
    textTransform: "capitalize",
  },
  topChannelArrow: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insightsPanel: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.035)",
    borderRadius: 24,
    padding: 24,
    backdropFilter: "blur(22px)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.32)",
  },
  insightsList: {
    display: "grid",
    gap: 12,
  },
  insightCard: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
    borderRadius: 18,
    padding: 15,
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    transition: "0.25s ease",
  },
  insightTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 800,
    color: "#67e8f9",
  },
  insightText: {
    margin: "6px 0 0",
    fontSize: 12,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.45)",
  },
  tooltip: {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.85)",
    padding: "12px 14px",
    borderRadius: 14,
    backdropFilter: "blur(16px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  radialOne: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,0,255,0.35), transparent)",
  },
  radialTwo: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,200,150,0.12), transparent)",
  },
  radialThree: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 40% 30% at 10% 70%, rgba(220,0,100,0.08), transparent)",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  },
  orbOne: {
    position: "absolute",
    left: "8%",
    top: "18%",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,0,255,0.35) 0%, transparent 70%)",
    filter: "blur(70px)",
  },
  orbTwo: {
    position: "absolute",
    right: "10%",
    top: "30%",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,200,150,0.28) 0%, transparent 70%)",
    filter: "blur(70px)",
  },
}
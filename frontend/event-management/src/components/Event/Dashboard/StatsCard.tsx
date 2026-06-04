interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: string;
  index?: number;
}

export default function StatsCard({
  label,
  value,
  sub,
  icon,
  accent = "#00e5a0",
  index = 0,
}: Props) {
  return (
    <div
      className="stats-card"
      style={
        {
          animationDelay: `${index * 100}ms`,
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      <div
        className="stats-icon"
        style={{ color: accent, background: `${accent}15` }}
      >
        {icon}
      </div>
      <div className="stats-body">
        <span className="stats-label">{label}</span>
        <span className="stats-value">{value}</span>
        {sub && <span className="stats-sub">{sub}</span>}
      </div>
      <div
        className="stats-glow"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${accent}18 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

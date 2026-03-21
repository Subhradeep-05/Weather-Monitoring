const S = {
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 14, padding: 16, position: 'relative', overflow: 'hidden',
  },
  top:  { height: 3, borderRadius: 3, marginBottom: 14 },
  lbl:  { fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  val:  { fontSize: 30, fontWeight: 700, lineHeight: 1 },
  unit: { fontSize: 13, fontWeight: 400, color: 'var(--muted)', marginLeft: 3 },
  bar:  { height: 3, background: 'var(--bg3)', borderRadius: 2, marginTop: 12, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2, transition: 'width .8s ease' },
};

export default function KpiCard({ label, value, unit, pct, color, accent, mono }) {
  const clamp = Math.min(100, Math.max(0, pct));
  return (
    <div style={S.card}>
      <div style={{ ...S.top, background: `linear-gradient(90deg,${color},${accent})` }} />
      <div style={S.lbl}>{label}</div>
      <div style={{ ...S.val, fontFamily: mono ? 'var(--mono)' : 'var(--font)', fontSize: mono ? 18 : 30 }}>
        <span style={{ color }}>{value}</span>
        {unit && <span style={S.unit}>{unit}</span>}
      </div>
      <div style={S.bar}>
        <div style={{
          ...S.fill,
          width: `${clamp}%`,
          background: `linear-gradient(90deg,${color},${accent})`,
        }} />
      </div>
    </div>
  );
}

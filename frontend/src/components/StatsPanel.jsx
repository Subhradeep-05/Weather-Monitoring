const S = {
  box:  { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px' },
  h:    { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 },
  row:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 12 },
  last: { borderBottom: 'none' },
  key:  { color: 'var(--muted)' },
  val:  { fontFamily: 'var(--mono)', color: 'var(--text)' },
};

export default function StatsPanel({ stats, latest }) {
  const rows = [
    { k: 'Min temp',       v: stats?.minTemp != null ? `${stats.minTemp.toFixed(1)}°C` : '--' },
    { k: 'Max temp',       v: stats?.maxTemp != null ? `${stats.maxTemp.toFixed(1)}°C` : '--' },
    { k: 'Avg temp',       v: stats?.avgTemp != null ? `${stats.avgTemp.toFixed(1)}°C` : '--' },
    { k: 'Avg humidity',   v: stats?.avgHum  != null ? `${stats.avgHum.toFixed(1)}%`   : '--' },
    { k: 'Total readings', v: stats?.count ?? '--' },
    { k: 'Device',         v: latest?.deviceId ?? '--' },
  ];
  return (
    <div style={S.box}>
      <div style={S.h}>Statistics</div>
      {rows.map((r, i) => (
        <div key={r.k} style={{ ...S.row, ...(i === rows.length - 1 ? S.last : {}) }}>
          <span style={S.key}>{r.k}</span>
          <span style={S.val}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

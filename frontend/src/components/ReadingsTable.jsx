const S = {
  wrap:  { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px', marginBottom: 12, overflowX: 'auto' },
  h:     { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 },
  table: { width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: 11 },
  th:    { textAlign: 'left', padding: '6px 10px', color: 'var(--muted)', fontWeight: 500, borderBottom: '1px solid var(--border)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  td:    { padding: '8px 10px', borderBottom: '1px solid rgba(26,40,64,.5)' },
};

function tempColor(t) {
  if (t > 38) return 'var(--danger)';
  if (t > 30) return 'var(--warn)';
  if (t < 15) return 'var(--hum)';
  return 'var(--ok)';
}

export default function ReadingsTable({ readings }) {
  return (
    <div style={S.wrap}>
      <div style={S.h}>Recent readings (last 20)</div>
      <table style={S.table}>
        <thead>
          <tr>
            {['Time', 'Temp (°C)', 'Humidity (%)', 'Heat Index (°C)', 'Device'].map(col => (
              <th key={col} style={S.th}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(readings || []).map((r, i) => (
            <tr key={i} style={{ opacity: i === 0 ? 1 : 0.85 }}>
              <td style={{ ...S.td, color: 'var(--muted)' }}>
                {new Date(r.timestamp).toLocaleTimeString()}
              </td>
              <td style={{ ...S.td, color: tempColor(r.temperature) }}>
                {r.temperature?.toFixed(1)}
              </td>
              <td style={{ ...S.td, color: 'var(--hum)' }}>
                {r.humidity?.toFixed(1)}
              </td>
              <td style={{ ...S.td, color: 'var(--heat)' }}>
                {r.heatIndex?.toFixed(1) ?? '--'}
              </td>
              <td style={{ ...S.td, color: 'var(--muted)' }}>
                {r.deviceId}
              </td>
            </tr>
          ))}
          {(!readings || readings.length === 0) && (
            <tr>
              <td colSpan={5} style={{ ...S.td, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>
                No readings yet — waiting for ESP32 data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

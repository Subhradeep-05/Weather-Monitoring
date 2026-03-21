import { useState, useEffect } from 'react';

const S = {
  bar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
    background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10,
    padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)',
    marginBottom: 12, flexWrap: 'wrap',
  },
  dot: { width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 5 },
};

export default function StatusBar({ online, latest, pollMs }) {
  const [now, setNow] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  const lastSeen = latest?.timestamp
    ? new Date(latest.timestamp).toLocaleTimeString()
    : 'N/A';

  return (
    <div style={S.bar}>
      <span>
        <span style={{ ...S.dot, background: online ? 'var(--ok)' : 'var(--danger)' }} />
        {online ? 'Connected' : 'Disconnected'}
      </span>
      <span>Last reading: {lastSeen}</span>
      <span>Poll interval: {pollMs / 1000}s</span>
      <span>Local time: {now}</span>
      <span>Backend: localhost:5000</span>
      <span>DB: MongoDB Atlas</span>
    </div>
  );
}

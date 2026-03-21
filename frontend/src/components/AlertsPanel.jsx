import { useState, useEffect } from 'react';

const S = {
  box:   { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px' },
  h:     { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 },
  alert: { padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11, fontFamily: 'var(--mono)' },
  none:  { color: 'var(--muted)', fontSize: 11, textAlign: 'center', padding: '20px 0' },
};

function checkAlerts(latest) {
  if (!latest) return [];
  const alerts = [];
  const ts = new Date(latest.timestamp).toLocaleTimeString();
  if (latest.temperature > 38)  alerts.push({ msg: `High temp: ${latest.temperature.toFixed(1)}°C`,  color: 'var(--danger)', ts });
  if (latest.temperature < 10)  alerts.push({ msg: `Low temp: ${latest.temperature.toFixed(1)}°C`,   color: 'var(--hum)',    ts });
  if (latest.humidity > 80)     alerts.push({ msg: `High humidity: ${latest.humidity.toFixed(1)}%`,  color: 'var(--warn)',   ts });
  if (latest.humidity < 20)     alerts.push({ msg: `Low humidity: ${latest.humidity.toFixed(1)}%`,   color: 'var(--hum)',    ts });
  if (latest.heatIndex > 40)    alerts.push({ msg: `Heat index alert: ${latest.heatIndex.toFixed(1)}°C`, color: 'var(--danger)', ts });
  return alerts;
}

export default function AlertsPanel({ latest }) {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const newAlerts = checkAlerts(latest);
    if (newAlerts.length) {
      setLog(prev => [...newAlerts, ...prev].slice(0, 8));
    }
  }, [latest]);

  return (
    <div style={S.box}>
      <div style={S.h}>
        Alerts{log.length > 0 && <span style={{ color: 'var(--danger)', marginLeft: 6 }}>({log.length})</span>}
      </div>
      {log.length === 0
        ? <div style={S.none}>No alerts active</div>
        : log.map((a, i) => (
          <div
            key={i}
            style={{ ...S.alert, color: a.color, borderBottom: i === log.length - 1 ? 'none' : undefined }}
          >
            ⚠ {a.msg}{' '}
            <span style={{ color: 'var(--muted)', fontSize: 9 }}>{a.ts}</span>
          </div>
        ))
      }
    </div>
  );
}

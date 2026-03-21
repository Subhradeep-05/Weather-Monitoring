const S = {
  wrap:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  logo:  { fontSize: 18, fontWeight: 700, letterSpacing: 3, color: 'var(--hum)', textTransform: 'uppercase', fontFamily: 'var(--font)' },
  sub:   { fontSize: 11, color: 'var(--muted)', marginTop: 2 },
  right: { display: 'flex', alignItems: 'center', gap: 10 },
  dev:   { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' },
  badge: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#001a24', border: '1px solid rgba(0,212,255,.2)',
    borderRadius: 20, padding: '5px 12px',
    fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hum)',
  },
  dot: { width: 7, height: 7, borderRadius: '50%', transition: 'background .3s' },
};

export default function Header({ online, deviceId }) {
  return (
    <div style={S.wrap}>
      <div>
        <div style={S.logo}>⬡ IoT Monitor</div>
        <div style={S.sub}>Real-time sensor dashboard · auto-refresh 5s</div>
      </div>
      <div style={S.right}>
        <span style={S.dev}>{deviceId || 'esp32-01'}</span>
        <div style={S.badge}>
          <div style={{
            ...S.dot,
            background: online ? 'var(--ok)' : 'var(--danger)',
            boxShadow: online ? '0 0 6px var(--ok)' : 'none',
          }} />
          {online ? 'LIVE' : 'OFFLINE'}
        </div>
      </div>
    </div>
  );
}

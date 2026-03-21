import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function getZone(t) {
  if (t == null) return { label: 'No data', color: '#4a6080', pct: 0 };
  if (t < 18)   return { label: 'Cold',    color: '#00d4ff', pct: (t / 18) * 33 };
  if (t <= 28)  return { label: 'Comfort', color: '#00ff88', pct: 33 + ((t - 18) / 10) * 34 };
  if (t <= 38)  return { label: 'Warm',    color: '#ffb700', pct: 67 + ((t - 28) / 10) * 20 };
  return               { label: 'Hot ⚠',  color: '#ff3c3c', pct: 95 };
}

const S = {
  box:   { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px' },
  h:     { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 },
  mid:   { textAlign: 'center', marginTop: -10 },
  val:   { fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 700, lineHeight: 1 },
  zone:  { fontSize: 11, color: 'var(--muted)', marginTop: 4 },
  zones: { display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '0 4px' },
  zitem: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--muted)' },
  zdot:  { width: 6, height: 6, borderRadius: '50%' },
};

export default function GaugeChart({ temp }) {
  const z = getZone(temp);
  const data = [{ value: z.pct }, { value: 100 - z.pct }];
  return (
    <div style={S.box}>
      <div style={S.h}>Comfort Zone</div>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data} dataKey="value"
            startAngle={180} endAngle={0}
            innerRadius="58%" outerRadius="80%" strokeWidth={0}
          >
            <Cell fill={z.color} />
            <Cell fill="#1a2840" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={S.mid}>
        <div style={{ ...S.val, color: z.color }}>
          {temp != null ? temp.toFixed(1) : '--'}°C
        </div>
        <div style={S.zone}>{z.label}</div>
      </div>
      <div style={S.zones}>
        {[['#00d4ff','Cold'],['#00ff88','Comfort'],['#ffb700','Warm'],['#ff3c3c','Hot']].map(([c, l]) => (
          <span key={l} style={S.zitem}>
            <span style={{ ...S.zdot, background: c }} />{l}
          </span>
        ))}
      </div>
    </div>
  );
}

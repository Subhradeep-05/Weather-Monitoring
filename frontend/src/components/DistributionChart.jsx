import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BINS = ['<20', '20–25', '25–30', '30–35', '35–40', '>40'];
const COLS = ['#00d4ff', '#00ff88', '#7fff00', '#ffb700', '#ff9500', '#ff3c3c'];

function buildBins(data) {
  const counts = [0, 0, 0, 0, 0, 0];
  (data || []).forEach(d => {
    const t = d.temperature;
    if      (t < 20) counts[0]++;
    else if (t < 25) counts[1]++;
    else if (t < 30) counts[2]++;
    else if (t < 35) counts[3]++;
    else if (t < 40) counts[4]++;
    else             counts[5]++;
  });
  return BINS.map((label, i) => ({ label, count: counts[i] }));
}

const S = {
  box: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px' },
  h:   { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 },
};

export default function DistributionChart({ data }) {
  const bins = buildBins(data);
  return (
    <div style={S.box}>
      <div style={S.h}>Temp distribution</div>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={bins} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2840" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: '#4a6080', fontSize: 9 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: '#4a6080', fontSize: 9 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0c1420', border: '1px solid #1a2840', borderRadius: 8, fontSize: 11 }}
            cursor={{ fill: 'rgba(255,255,255,.04)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Readings">
            {bins.map((_, i) => <Cell key={i} fill={COLS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

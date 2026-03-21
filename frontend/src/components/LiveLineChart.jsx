import {
  ResponsiveContainer, ComposedChart, Line, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

function fmtTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const S = {
  box:    { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px' },
  title:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  h:      { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5 },
  tag:    { background: '#001a10', border: '1px solid rgba(0,255,136,.2)', borderRadius: 4, padding: '2px 8px', color: 'var(--ok)', fontSize: 9, fontFamily: 'var(--mono)' },
  legend: { display: 'flex', gap: 16, marginBottom: 10 },
  litem:  { display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--muted)' },
  ldot:   { width: 8, height: 8, borderRadius: 2 },
};

export default function LiveLineChart({ data }) {
  return (
    <div style={S.box}>
      <div style={S.title}>
        <span style={S.h}>Temperature & Humidity — Live</span>
        <span style={S.tag}>REALTIME</span>
      </div>
      <div style={S.legend}>
        <span style={S.litem}><span style={{ ...S.ldot, background: 'var(--temp)' }} />Temperature (°C)</span>
        <span style={S.litem}><span style={{ ...S.ldot, background: 'var(--hum)' }} />Humidity (%)</span>
        <span style={S.litem}><span style={{ ...S.ldot, background: 'var(--heat)' }} />Heat Index (°C)</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2840" />
          <XAxis
            dataKey="timestamp" tickFormatter={fmtTime}
            tick={{ fill: '#4a6080', fontSize: 9 }} tickLine={false} axisLine={false} minTickGap={40}
          />
          <YAxis yAxisId="left"  tick={{ fill: '#4a6080', fontSize: 9 }} tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#4a6080', fontSize: 9 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#0c1420', border: '1px solid #1a2840', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 11 }}
            labelStyle={{ color: '#4a6080', marginBottom: 4 }}
            labelFormatter={fmtTime}
          />
          <Area
            yAxisId="left" type="monotone" dataKey="temperature"
            stroke="var(--temp)" fill="rgba(255,107,53,.08)" strokeWidth={2} dot={false} name="Temp °C"
          />
          <Line
            yAxisId="right" type="monotone" dataKey="humidity"
            stroke="var(--hum)" strokeWidth={2} dot={false} name="Humidity %"
          />
          <Line
            yAxisId="left" type="monotone" dataKey="heatIndex"
            stroke="var(--heat)" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Heat Index °C"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

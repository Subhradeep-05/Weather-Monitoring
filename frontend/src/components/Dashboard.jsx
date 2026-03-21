import Header            from './Header';
import KpiCard           from './KpiCard';
import LiveLineChart     from './LiveLineChart';
import GaugeChart        from './GaugeChart';
import DistributionChart from './DistributionChart';
import StatsPanel        from './StatsPanel';
import AlertsPanel       from './AlertsPanel';
import ReadingsTable     from './ReadingsTable';
import StatusBar         from './StatusBar';

const S = {
  wrap:  { maxWidth: 1200, margin: '0 auto', padding: '20px 16px' },
  kpis:  { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 },
  row2:  { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 },
  row3:  { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 },
};

function fmtUptime(s) {
  const h  = String(Math.floor(s / 3600)).padStart(2, '0');
  const m  = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sc = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sc}`;
}

export default function Dashboard({ latest, history, readings, stats, online, uptime }) {
  const t = latest?.temperature;
  const h = latest?.humidity;
  const x = latest?.heatIndex;

  return (
    <div style={S.wrap}>
      <Header online={online} deviceId={latest?.deviceId} />

      <div style={S.kpis}>
        <KpiCard
          label="Temperature" value={t != null ? t.toFixed(1) : '--'} unit="°C"
          pct={t != null ? (t / 50) * 100 : 0} color="var(--temp)" accent="#ff9500"
        />
        <KpiCard
          label="Humidity" value={h != null ? h.toFixed(1) : '--'} unit="%"
          pct={h ?? 0} color="var(--hum)" accent="#0088ff"
        />
        <KpiCard
          label="Heat Index" value={x != null ? x.toFixed(1) : '--'} unit="°C"
          pct={x != null ? (x / 60) * 100 : 0} color="var(--heat)" accent="#7c3aed"
        />
        <KpiCard
          label="Session Uptime" value={fmtUptime(uptime)} unit=""
          pct={40} color="var(--ok)" accent="var(--hum)" mono
        />
      </div>

      <div style={S.row2}>
        <LiveLineChart data={history} />
        <GaugeChart temp={t} />
      </div>

      <div style={S.row3}>
        <DistributionChart data={history} />
        <StatsPanel stats={stats} latest={latest} />
        <AlertsPanel latest={latest} />
      </div>

      <ReadingsTable readings={readings} />
      <StatusBar online={online} latest={latest} pollMs={5000} />
    </div>
  );
}

import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';

const POLL = 5000;

export default function App() {
  const [latest,   setLatest]   = useState(null);
  const [history,  setHistory]  = useState([]);
  const [readings, setReadings] = useState([]);
  const [stats,    setStats]    = useState({});
  const [online,   setOnline]   = useState(false);
  const [uptime,   setUptime]   = useState(0);
  const startRef = useRef(Date.now());

  const fetchAll = useCallback(async () => {
    try {
      const [lat, hist, rds, sts] = await Promise.all([
        axios.get('/api/sensor/latest'),
        axios.get('/api/sensor/history?limit=60'),
        axios.get('/api/sensor/readings?limit=20'),
        axios.get('/api/sensor/stats'),
      ]);
      setLatest(lat.data);
      setHistory(hist.data);
      setReadings(rds.data);
      setStats(sts.data);
      setOnline(true);
    } catch {
      setOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const pollId   = setInterval(fetchAll, POLL);
    const uptimeId = setInterval(
      () => setUptime(Math.floor((Date.now() - startRef.current) / 1000)),
      1000
    );
    return () => {
      clearInterval(pollId);
      clearInterval(uptimeId);
    };
  }, [fetchAll]);

  return (
    <Dashboard
      latest={latest}
      history={history}
      readings={readings}
      stats={stats}
      online={online}
      uptime={uptime}
    />
  );
}

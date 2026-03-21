const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Mongoose Schema ───────────────────────────────────────
const sensorSchema = new mongoose.Schema({
  temperature : { type: Number, required: true },
  humidity    : { type: Number, required: true },
  heatIndex   : { type: Number },
  deviceId    : { type: String, default: 'esp32-01' },
  timestamp   : { type: Date,   default: Date.now },
});
const Sensor = mongoose.model('Sensor', sensorSchema);

// ── Routes ────────────────────────────────────────────────

// ESP32 posts here every 10s
app.post('/api/sensor', async (req, res) => {
  try {
    const { temperature, humidity, heatIndex, deviceId } = req.body;
    const entry = await Sensor.create({ temperature, humidity, heatIndex, deviceId });
    console.log(`[${new Date().toLocaleTimeString()}] Saved: ${JSON.stringify({ temperature, humidity, heatIndex })}`);
    res.status(201).json({ success: true, id: entry._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Latest single reading
app.get('/api/sensor/latest', async (req, res) => {
  try {
    const doc = await Sensor.findOne().sort({ timestamp: -1 });
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History for charts (default last 100)
app.get('/api/sensor/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const data  = await Sensor.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    res.json(data.reverse()); // oldest → newest for charts
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aggregated stats (min/max/avg)
app.get('/api/sensor/stats', async (req, res) => {
  try {
    const stats = await Sensor.aggregate([
      { $group: {
        _id     : null,
        minTemp : { $min: '$temperature' },
        maxTemp : { $max: '$temperature' },
        avgTemp : { $avg: '$temperature' },
        avgHum  : { $avg: '$humidity' },
        count   : { $sum: 1 },
      }}
    ]);
    res.json(stats[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Last N readings as table
app.get('/api/sensor/readings', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const data  = await Sensor.find().sort({ timestamp: -1 }).limit(limit).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Connect ───────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB Atlas connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀  Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.error('❌  MongoDB error:', err));

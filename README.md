# ⬡ IoT Dashboard — ESP32 + DHT11 + MongoDB Atlas + React Vite

> Real-time temperature & humidity monitoring system. Sensor data flows from your ESP32 through WiFi → Express API → MongoDB Atlas → live React dashboard, auto-refreshing every 5 seconds.

![ESP32](https://img.shields.io/badge/ESP32-Microcontroller-blue?style=for-the-badge&logo=espressif&logoColor=white)
![DHT11](https://img.shields.io/badge/DHT11-Sensor-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📡 How It Connects

```
┌─────────────┐     GPIO4      ┌─────────────┐    HTTP POST    ┌─────────────┐
│             │ ─────────────► │             │ ──────────────► │             │
│    DHT11    │   temp+humid   │    ESP32    │  JSON every 10s │   Express   │
│   Sensor    │                │    Chip     │   port :5000    │   Backend   │
│             │ ◄───────────── │             │                 │             │
└─────────────┘    3.3V / GND  └─────────────┘                 └──────┬──────┘
                                                                       │
                                                                  Mongoose ODM
                                                                       │
                                                                       ▼
┌─────────────┐   axios GET    ┌─────────────┐    saves doc    ┌─────────────┐
│             │ ◄────────────  │             │ ◄────────────── │             │
│   Browser   │   every 5s     │  React Vite │                 │  MongoDB    │
│  Dashboard  │                │  :5173      │                 │   Atlas     │
│             │                │             │                 │   Cloud     │
└─────────────┘                └─────────────┘                 └─────────────┘
```

---

## ✨ Features

| Feature                   | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| 📊 **Live KPI Cards**     | Temperature, Humidity, Heat Index, Uptime with animated progress bars |
| 📈 **Real-Time Charts**   | Area + line chart with dual Y-axis, auto-refreshes every 5s           |
| 🌡️ **Comfort Gauge**      | Semi-circle gauge — Cold / Comfort / Warm / Hot zones                 |
| 📉 **Distribution Chart** | Color-coded bar chart of temperature ranges                           |
| ⚠️ **Auto Alerts**        | Threshold alerts for high/low temp, humidity, heat index              |
| 📋 **Readings Table**     | Last 20 readings with color-coded values and timestamps               |
| 🔴 **Status Bar**         | Live connection state, last reading time, poll interval               |

---

## 🗂️ Project Structure

```
iot-dashboard/
├── 📁 arduino/
│   └── esp32_dht11.ino          ← Flash this to your ESP32
│
├── 📁 backend/
│   ├── .env                     ← MongoDB URI + PORT (edit this)
│   ├── package.json
│   └── server.js                ← Express + Mongoose REST API
│
└── 📁 frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js           ← Proxy /api → localhost:5000
    └── src/
        ├── App.jsx              ← Polling logic (5s interval)
        ├── index.css            ← Global dark theme
        ├── main.jsx
        └── components/
            ├── Dashboard.jsx
            ├── Header.jsx
            ├── KpiCard.jsx
            ├── LiveLineChart.jsx
            ├── GaugeChart.jsx
            ├── DistributionChart.jsx
            ├── StatsPanel.jsx
            ├── AlertsPanel.jsx
            ├── ReadingsTable.jsx
            └── StatusBar.jsx
```

---

## ⚡ Circuit Wiring

```
        DHT11 Sensor                    ESP32 Dev Board
       ┌───────────┐                   ┌───────────────┐
       │           │                   │               │
       │    VCC  ──┼───────────────────┼── 3.3V        │
       │           │                   │               │
       │    DATA ──┼────┐  10kΩ ───────┼── 3.3V        │
       │           │    └──────────────┼── GPIO 4       │
       │           │                   │               │
       │    GND  ──┼───────────────────┼── GND         │
       │           │                   │               │
       └───────────┘                   └───────────────┘

  ⚠️  The 10kΩ pull-up resistor between VCC and DATA is required.
      Without it, readings will fail or return NaN.
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Reset MongoDB Atlas password

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → Edit your user → set a new password
   > Use only letters + numbers. Avoid `@ # / ? !` — they break the URI.
3. **Network Access** → Add IP Address → **Allow Access From Anywhere** `0.0.0.0/0` → Confirm
4. Wait ~30 seconds for it to apply

---

### Step 2 — Configure the backend

Edit `backend/.env`:

```env
MONGO_URI=mongodb+srv://subhralovesmom123:YOURNEWPASSWORD@cluster0.mpmae1f.mongodb.net/iotdb?appName=Cluster0
PORT=5000
```

---

### Step 3 — Start the backend

Open **Terminal 1**:

```bash
cd iot-dashboard/backend
npm install
npm run dev
```

Expected output:

```
✅  MongoDB Atlas connected
🚀  Server running on http://localhost:5000
```

---

### Step 4 — Start the frontend

Open **Terminal 2**:

```bash
cd iot-dashboard/frontend
npm install
npm run dev
```

Open your browser at **http://localhost:5173**

> The dashboard will show `OFFLINE` until the ESP32 starts sending data.

---

### Step 5 — Find your PC's local IP

```bash
# Windows
ipconfig
# Look for: IPv4 Address . . . 192.168.x.x

# Linux / Mac
ip addr show | grep "inet "
```

Write down your IP — you need it for the Arduino sketch.

---

### Step 6 — Install Arduino IDE libraries

**Tools → Manage Libraries** → install:

| Library            | Author          |
| ------------------ | --------------- |
| DHT sensor library | Adafruit        |
| ArduinoJson        | Benoit Blanchon |

**Add ESP32 board support:**

Go to File → Preferences → Additional Board URLs and paste:

```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

Then Tools → Boards Manager → search `esp32` → Install **esp32 by Espressif Systems**

---

### Step 7 — Configure the Arduino sketch

Open `arduino/esp32_dht11.ino` and fill in your details:

```cpp
const char* ssid      = "YOUR_WIFI_NAME";
const char* password  = "YOUR_WIFI_PASSWORD";
const char* serverURL = "http://192.168.1.105:5000/api/sensor"; // ← your PC IP
```

Then in Arduino IDE:

- **Tools → Board → DOIT ESP32 DEVKIT V1**
- **Tools → Port** → select your ESP32 COM port
- Click **Upload** ▶

---

### Step 8 — Verify in Serial Monitor

Open **Tools → Serial Monitor** at **115200 baud**:

```
Connecting to WiFi......
Connected! IP: 192.168.1.88
Temp: 28.5°C  Humidity: 62.0%  HeatIdx: 29.1°C
HTTP Status: 201                    ← data saved successfully ✅
```

---

## 🔌 API Endpoints

| Method | Route                           | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| `POST` | `/api/sensor`                   | ESP32 sends data here every 10s |
| `GET`  | `/api/sensor/latest`            | Most recent single reading      |
| `GET`  | `/api/sensor/history?limit=60`  | Chart data (oldest → newest)    |
| `GET`  | `/api/sensor/stats`             | Min / Max / Avg aggregations    |
| `GET`  | `/api/sensor/readings?limit=20` | Table data (newest first)       |

### Example POST body (sent by ESP32):

```json
{
  "temperature": 28.5,
  "humidity": 62.0,
  "heatIndex": 29.1,
  "deviceId": "esp32-01"
}
```

### Example GET response (`/api/sensor/latest`):

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "temperature": 28.5,
  "humidity": 62.0,
  "heatIndex": 29.1,
  "deviceId": "esp32-01",
  "timestamp": "2025-01-15T14:32:10.000Z"
}
```

---

## 🔍 Serial Monitor Decoder

| Message                            | Meaning                  | Action                               |
| ---------------------------------- | ------------------------ | ------------------------------------ |
| `Connected! IP: 192.168.x.x`       | WiFi connected ✅        | All good                             |
| `HTTP Status: 201`                 | Data saved to MongoDB ✅ | All good                             |
| `HTTP Status: -1`                  | Can't reach backend      | Check PC IP + backend running        |
| `HTTP Status: 500`                 | Backend error            | Check backend terminal for errors    |
| `DHT11 read failed!`               | Sensor wiring issue      | Check connections + pull-up resistor |
| `Connecting to WiFi......` (stuck) | Wrong WiFi credentials   | Check SSID and password              |

---

## 🛠️ Troubleshooting

<details>
<summary><b>🔴 MongoDB error: IP not whitelisted</b></summary>

```
MongooseServerSelectionError: Could not connect to any servers
```

**Fix:**

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Network Access → Add IP Address → Allow Access From Anywhere (`0.0.0.0/0`)
3. Wait 30 seconds
4. In your backend terminal type `rs` + Enter to restart nodemon

</details>

<details>
<summary><b>🔴 HTTP Status: -1 in Serial Monitor</b></summary>

Your PC's IP changed after reconnecting to WiFi.

**Fix:**

1. Run `ipconfig` (Windows) or `ip addr` (Mac/Linux)
2. Copy the new IPv4 address
3. Update line 8 of `esp32_dht11.ino`
4. Re-upload the sketch

</details>

<details>
<summary><b>🟡 Dashboard shows OFFLINE</b></summary>

The backend is not running.

**Fix:**

```bash
cd iot-dashboard/backend
npm run dev
```

Both Terminal 1 (backend) and Terminal 2 (frontend) must be open simultaneously.

</details>

<details>
<summary><b>🟡 ECONNREFUSED error in Vite terminal</b></summary>

```
AggregateError [ECONNREFUSED]
http proxy error: /api/sensor/latest
```

**Fix:** Start the backend first. Vite's proxy forwards `/api` requests to `localhost:5000` — if nothing is listening there, you get this error.

</details>

<details>
<summary><b>🟡 DHT11 read failed / NaN values</b></summary>

**Fix:**

- Confirm `VCC → 3.3V`, `DATA → GPIO4`, `GND → GND`
- Add 10kΩ pull-up resistor between VCC and DATA
- Try a different USB cable (some only carry power, not data)
- If still failing, change `#define DHTPIN 4` to GPIO2 or GPIO5 and test

</details>

<details>
<summary><b>🔵 Blue LED is ON on ESP32 — is this normal?</b></summary>

**Yes, completely normal.** The sketch sets `GPIO2 HIGH` as soon as WiFi connects:

```cpp
digitalWrite(LED_PIN, HIGH);  // LED on = WiFi connected ✅
```

If the LED is blinking rapidly, the ESP32 is still trying to connect. If it stays off, WiFi failed — double-check your credentials.

</details>

---

## 🧱 Tech Stack

| Layer           | Technology                             | Version          |
| --------------- | -------------------------------------- | ---------------- |
| Microcontroller | ESP32 Dev Board                        | —                |
| Sensor          | DHT11                                  | —                |
| Firmware        | Arduino C++ (HTTPClient + ArduinoJson) | ArduinoJson v6   |
| Backend         | Node.js + Express                      | v4.19            |
| ODM             | Mongoose                               | v8               |
| Database        | MongoDB Atlas                          | Cloud            |
| Frontend        | React + Vite                           | React 18, Vite 5 |
| Charts          | Recharts                               | v2.12            |
| HTTP Client     | Axios                                  | v1.7             |

---

## 📊 Dashboard Components

```
Dashboard
├── Header              → Device ID + LIVE/OFFLINE badge
├── KpiCard × 4         → Temperature, Humidity, Heat Index, Uptime
├── LiveLineChart       → Area+line chart, dual Y-axis, auto-refresh
├── GaugeChart          → Comfort zone semicircle (Cold/Comfort/Warm/Hot)
├── DistributionChart   → Temperature range bar chart
├── StatsPanel          → Min / Max / Avg from MongoDB aggregation
├── AlertsPanel         → Auto-generated threshold alerts log
├── ReadingsTable       → Last 20 readings with color-coded temps
└── StatusBar           → Connection state, last seen, poll interval
```

---

## ⚙️ Alert Thresholds

| Condition        | Threshold | Color     |
| ---------------- | --------- | --------- |
| High temperature | > 38°C    | 🔴 Red    |
| Low temperature  | < 10°C    | 🔵 Blue   |
| High humidity    | > 80%     | 🟡 Yellow |
| Low humidity     | < 20%     | 🔵 Blue   |
| High heat index  | > 40°C    | 🔴 Red    |

---

## 📝 Environment Variables

`backend/.env`:

| Variable    | Example                              | Description                          |
| ----------- | ------------------------------------ | ------------------------------------ |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster...` | Full MongoDB Atlas connection string |
| `PORT`      | `5000`                               | Port the Express server listens on   |

---

_Built with ESP32 · DHT11 · MongoDB Atlas · React Vite_

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>IoT Dashboard — ESP32 + DHT11</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#020812;--bg2:#060f1e;--bg3:#0a1628;
  --border:#0d2040;--glow:#00d4ff;--green:#00ff88;
  --orange:#ff6b35;--purple:#a855f7;--warn:#ffb700;
  --text:#c8daf0;--muted:#3a5a7a;
  --font-display:'Orbitron',monospace;
  --font-mono:'Share Tech Mono',monospace;
  --font-body:'Exo 2',sans-serif;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-weight:300;overflow-x:hidden;line-height:1.7}

/_ ── Scanline overlay ── _/
body::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,212,255,.012) 2px,rgba(0,212,255,.012) 4px);pointer-events:none;z-index:9999}

/_ ── Grid bg ── _/
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0}

/_ ── Animations ── _/
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes flicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:.4}94%{opacity:1}96%{opacity:.6}97%{opacity:1}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,.4)}70%{box-shadow:0 0 0 10px rgba(0,212,255,0)}}
@keyframes scanline{0%{top:-10%}100%{top:110%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes travel{0%{left:-60px;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:100%;opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes glow-pulse{0%,100%{text-shadow:0 0 10px var(--glow),0 0 20px var(--glow)}50%{text-shadow:0 0 20px var(--glow),0 0 40px var(--glow),0 0 60px var(--glow)}}
@keyframes bar-fill{from{width:0}to{width:var(--w)}}
@keyframes count-up{from{opacity:0}to{opacity:1}}

.fade-up{opacity:0;animation:fadeUp .7s ease forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}.d7{animation-delay:.7s}.d8{animation-delay:.8s}

/_ ── Layout ── _/
.wrap{max-width:980px;margin:0 auto;padding:0 24px;position:relative;z-index:1}

/_ ── Hero ── _/
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;padding:60px 24px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.2);border-radius:20px;padding:6px 16px;font-family:var(--font-mono);font-size:11px;color:var(--glow);margin-bottom:28px;letter-spacing:2px}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 1.5s infinite}
.hero-title{font-family:var(--font-display);font-size:clamp(32px,6vw,72px);font-weight:900;line-height:1.1;margin-bottom:16px;animation:glow-pulse 3s ease-in-out infinite,fadeUp .8s ease forwards;color:#fff;letter-spacing:2px}
.hero-title span{color:var(--glow)}
.hero-sub{font-size:clamp(14px,2vw,18px);color:var(--muted);max-width:560px;margin-bottom:40px;animation:fadeUp .8s ease .2s forwards;opacity:0}
.hero-tags{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;animation:fadeUp .8s ease .4s forwards;opacity:0}
.tag{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:6px;padding:6px 14px;font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:1px}
.tag.green{border-color:rgba(0,255,136,.3);color:var(--green);background:rgba(0,255,136,.04)}
.tag.orange{border-color:rgba(255,107,53,.3);color:var(--orange);background:rgba(255,107,53,.04)}
.tag.purple{border-color:rgba(168,85,247,.3);color:var(--purple);background:rgba(168,85,247,.04)}
.tag.blue{border-color:rgba(0,212,255,.3);color:var(--glow);background:rgba(0,212,255,.04)}

/_ ── Section ── _/
section{padding:80px 0}
.sec-label{font-family:var(--font-mono);font-size:10px;color:var(--glow);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:10px}
.sec-label::before{content:'';width:24px;height:1px;background:var(--glow)}
.sec-title{font-family:var(--font-display);font-size:clamp(22px,4vw,36px);font-weight:700;color:#fff;margin-bottom:40px;line-height:1.2}

/_ ── Data flow animation ── _/
.flow-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:32px 24px;margin-bottom:16px;overflow:hidden}
.flow-row{display:flex;align-items:center;gap:0;margin:14px 0}
.flow-node{background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:10px 16px;text-align:center;flex-shrink:0;min-width:110px}
.flow-node .fn-label{font-size:9px;font-family:var(--font-mono);color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}
.flow-node .fn-name{font-size:13px;font-weight:600;font-family:var(--font-display)}
.flow-node .fn-ip{font-size:9px;font-family:var(--font-mono);color:var(--muted);margin-top:2px}
.flow-wire{flex:1;height:3px;background:var(--border);position:relative;overflow:visible;margin:0 4px}
.packet{position:absolute;top:50%;transform:translateY(-50%);width:50px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-family:var(--font-mono);font-weight:700;animation:travel 2.2s linear infinite}
.packet2{animation-delay:1.1s}

/_ ── Cards grid ── _/
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:16px}
.card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:22px;position:relative;overflow:hidden;transition:border-color .3s,transform .2s}
.card:hover{border-color:rgba(0,212,255,.3);transform:translateY(-3px)}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px}
.card.c-green::before{background:linear-gradient(90deg,var(--green),#00a86b)}
.card.c-orange::before{background:linear-gradient(90deg,var(--orange),#ff9500)}
.card.c-blue::before{background:linear-gradient(90deg,var(--glow),#0088ff)}
.card.c-purple::before{background:linear-gradient(90deg,var(--purple),#7c3aed)}
.card-icon{font-size:24px;margin-bottom:12px}
.card-title{font-family:var(--font-display);font-size:14px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:1px}
.card-desc{font-size:13px;color:var(--muted);line-height:1.6}

/_ ── Steps ── _/
.steps{display:flex;flex-direction:column;gap:0}
.step{display:flex;gap:20px;padding:20px 0;border-bottom:1px solid var(--border);position:relative}
.step:last-child{border-bottom:none}
.step-num{font-family:var(--font-display);font-size:11px;font-weight:900;color:var(--glow);background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);border-radius:8px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.step-body{flex:1}
.step-title{font-size:15px;font-weight:600;color:#fff;margin-bottom:6px;font-family:var(--font-body)}
.step-desc{font-size:13px;color:var(--muted);line-height:1.6}
.step-desc a{color:var(--glow);text-decoration:none}
.step-desc a:hover{text-decoration:underline}

/_ ── Code block ── _/
.code-wrap{background:#020c18;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin:10px 0}
.code-bar{background:var(--bg3);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;align-items:center;justify-content:space-between}
.code-dots{display:flex;gap:6px}
.code-dots span{width:10px;height:10px;border-radius:50%}
.code-lang{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:1px}
pre{padding:18px;font-family:var(--font-mono);font-size:12px;line-height:1.7;overflow-x:auto;color:#7ab8d4}
pre .k{color:var(--purple)}
pre .s{color:var(--green)}
pre .c{color:var(--muted)}
pre .n{color:var(--orange)}
pre .p{color:var(--glow)}

/_ ── Table ── _/
.tbl-wrap{overflow-x:auto;margin:10px 0}
table{width:100%;border-collapse:collapse;font-size:13px;font-family:var(--font-mono)}
th{background:var(--bg3);border:1px solid var(--border);padding:10px 14px;text-align:left;font-size:10px;color:var(--glow);text-transform:uppercase;letter-spacing:1px;font-weight:400}
td{border:1px solid var(--border);padding:10px 14px;color:var(--text)}
tr:hover td{background:rgba(0,212,255,.03)}
.td-green{color:var(--green)}
.td-orange{color:var(--orange)}
.td-red{color:#ff3c3c}

/_ ── Wire diagram ── _/
.circuit{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:28px;font-family:var(--font-mono);font-size:12px}
.pin-row{display:flex;align-items:center;gap:12px;margin:8px 0}
.pin-dht{background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.3);color:var(--green);padding:4px 12px;border-radius:5px;min-width:80px;text-align:center}
.pin-arrow{color:var(--muted);flex:1;text-align:center;position:relative}
.pin-arrow::before,.pin-arrow::after{content:'';position:absolute;top:50%;height:1px;background:var(--border);width:40%}
.pin-arrow::before{left:0}.pin-arrow::after{right:0}
.pin-esp{padding:4px 12px;border-radius:5px;min-width:80px;text-align:center}
.pin-33{background:rgba(255,183,0,.1);border:1px solid rgba(255,183,0,.3);color:var(--warn)}
.pin-gnd{background:rgba(88,88,88,.2);border:1px solid #444;color:#888}
.pin-gpio{background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.3);color:var(--glow)}
.resistor-note{background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:8px;padding:10px 14px;color:var(--purple);font-size:11px;margin-top:14px;display:flex;align-items:center;gap:8px}

/_ ── Troubleshoot ── _/
.trouble-item{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px;margin:8px 0;display:flex;gap:14px;align-items:flex-start}
.trouble-icon{font-size:18px;flex-shrink:0;margin-top:1px}
.trouble-prob{font-size:13px;color:#ff3c3c;font-weight:600;margin-bottom:4px;font-family:var(--font-mono)}
.trouble-fix{font-size:12px;color:var(--muted);line-height:1.5}
.trouble-fix code{color:var(--green);background:rgba(0,255,136,.08);padding:1px 5px;border-radius:3px}

/_ ── API endpoints ── _/
.endpoint{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin:6px 0;font-family:var(--font-mono);font-size:12px}
.method{padding:3px 10px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:1px;min-width:46px;text-align:center}
.method.post{background:rgba(255,107,53,.15);border:1px solid rgba(255,107,53,.3);color:var(--orange)}
.method.get{background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.25);color:var(--green)}
.ep-path{color:var(--glow)}
.ep-desc{color:var(--muted);font-size:11px;margin-left:auto}

/_ ── Footer ── _/
footer{border-top:1px solid var(--border);padding:40px 0;text-align:center}
.footer-logo{font-family:var(--font-display);font-size:20px;font-weight:900;color:var(--glow);letter-spacing:3px;margin-bottom:10px;animation:glow-pulse 3s ease-in-out infinite}
.footer-sub{font-size:12px;color:var(--muted);font-family:var(--font-mono)}

/_ ── Divider ── _/
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:20px 0}

/_ ── Cursor blink ── _/
.cursor::after{content:'█';animation:blink 1s step-end infinite;color:var(--glow);font-size:.8em}
</style>

</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-badge fade-up d1"><div class="live-dot"></div>ESP32 · DHT11 · MongoDB Atlas · React Vite</div>
  <h1 class="hero-title">IoT <span>Dashboard</span></h1>
  <p class="hero-sub fade-up d2">Real-time temperature & humidity monitoring system. Sensor data flows from your ESP32 through WiFi → Express API → MongoDB Atlas → live React dashboard.</p>
  <div class="hero-tags">
    <span class="tag green">Node.js Backend</span>
    <span class="tag orange">Arduino C++</span>
    <span class="tag blue">React + Vite</span>
    <span class="tag purple">MongoDB Atlas</span>
    <span class="tag">Recharts</span>
    <span class="tag">DHT11 Sensor</span>
  </div>
</div>

<div class="wrap">

<!-- HOW IT CONNECTS -->
<section class="fade-up d2">
  <div class="sec-label">Architecture</div>
  <div class="sec-title">How it connects<span class="cursor"></span></div>

  <div class="flow-wrap">
    <div class="flow-row">
      <div class="flow-node" style="border-color:rgba(0,255,136,.3)">
        <div class="fn-label">sensor</div>
        <div class="fn-name" style="color:var(--green)">DHT11</div>
        <div class="fn-ip">GPIO4</div>
      </div>
      <div class="flow-wire" style="background:rgba(0,255,136,.3)">
        <div class="packet" style="background:var(--green);color:#000">DATA</div>
        <div class="packet packet2" style="background:var(--green);color:#000">DATA</div>
      </div>
      <div class="flow-node" style="border-color:rgba(0,212,255,.3)">
        <div class="fn-label">microcontroller</div>
        <div class="fn-name" style="color:var(--glow)">ESP32</div>
        <div class="fn-ip">192.168.x.88</div>
      </div>
      <div class="flow-wire" style="background:rgba(0,212,255,.3)">
        <div class="packet" style="background:var(--glow);color:#000;animation-delay:.4s">JSON</div>
        <div class="packet packet2" style="background:var(--glow);color:#000;animation-delay:1.5s">POST</div>
      </div>
      <div class="flow-node" style="border-color:rgba(255,107,53,.3)">
        <div class="fn-label">backend</div>
        <div class="fn-name" style="color:var(--orange)">Express</div>
        <div class="fn-ip">:5000</div>
      </div>
      <div class="flow-wire" style="background:rgba(168,85,247,.3)">
        <div class="packet" style="background:var(--purple);color:#fff;animation-delay:.8s">SAVE</div>
        <div class="packet packet2" style="background:var(--purple);color:#fff;animation-delay:1.9s">SAVE</div>
      </div>
      <div class="flow-node" style="border-color:rgba(168,85,247,.3)">
        <div class="fn-label">database</div>
        <div class="fn-name" style="color:var(--purple)">MongoDB</div>
        <div class="fn-ip">Atlas Cloud</div>
      </div>
      <div class="flow-wire" style="background:rgba(0,212,255,.2)">
        <div class="packet" style="background:#0088ff;color:#fff;animation-delay:1.2s">GET</div>
        <div class="packet packet2" style="background:#0088ff;color:#fff;animation-delay:2.3s">GET</div>
      </div>
      <div class="flow-node" style="border-color:rgba(0,212,255,.3)">
        <div class="fn-label">frontend</div>
        <div class="fn-name" style="color:var(--glow)">React</div>
        <div class="fn-ip">:5173</div>
      </div>
    </div>
  </div>
  <p style="font-size:12px;color:var(--muted);font-family:var(--font-mono);text-align:center">ESP32 sends JSON via HTTP POST every 10s → Express saves to Atlas → React polls every 5s → Charts update live</p>
</section>

<div class="divider"></div>

<!-- FEATURES -->
<section class="fade-up d3">
  <div class="sec-label">Features</div>
  <div class="sec-title">What you get</div>
  <div class="cards">
    <div class="card c-green fade-up d2">
      <div class="card-icon">📡</div>
      <div class="card-title">Live KPI Cards</div>
      <div class="card-desc">Temperature, Humidity, Heat Index and Session Uptime — all updating in real-time with animated progress bars.</div>
    </div>
    <div class="card c-blue fade-up d3">
      <div class="card-icon">📈</div>
      <div class="card-title">Real-Time Charts</div>
      <div class="card-desc">Area + line chart with dual Y-axis showing Temperature, Humidity and Heat Index history. Auto-refreshes every 5 seconds.</div>
    </div>
    <div class="card c-orange fade-up d4">
      <div class="card-icon">🌡️</div>
      <div class="card-title">Comfort Gauge</div>
      <div class="card-desc">Semi-circle gauge showing Cold / Comfort / Warm / Hot zones based on live temperature reading.</div>
    </div>
    <div class="card c-purple fade-up d5">
      <div class="card-icon">⚠️</div>
      <div class="card-title">Auto Alerts</div>
      <div class="card-desc">Automatic threshold alerts for high temp (&gt;38°C), low temp (&lt;10°C), high humidity (&gt;80%) and heat index spikes.</div>
    </div>
    <div class="card c-green fade-up d3">
      <div class="card-icon">📊</div>
      <div class="card-title">Distribution Chart</div>
      <div class="card-desc">Color-coded bar chart showing how often temperature falls in each range across all stored readings.</div>
    </div>
    <div class="card c-blue fade-up d4">
      <div class="card-icon">📋</div>
      <div class="card-title">Readings Table</div>
      <div class="card-desc">Scrollable table of the last 20 readings with color-coded temperature values and timestamps.</div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- CIRCUIT WIRING -->
<section class="fade-up d3">
  <div class="sec-label">Hardware</div>
  <div class="sec-title">Circuit wiring</div>
  <div class="circuit">
    <div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px">DHT11 → ESP32 pin mapping</div>
    <div class="pin-row">
      <div class="pin-dht">VCC</div>
      <div class="pin-arrow">────────────</div>
      <div class="pin-esp pin-33">3.3V</div>
    </div>
    <div class="pin-row">
      <div class="pin-dht">DATA</div>
      <div class="pin-arrow">────────────</div>
      <div class="pin-esp pin-gpio">GPIO 4</div>
    </div>
    <div class="pin-row">
      <div class="pin-dht">GND</div>
      <div class="pin-arrow">────────────</div>
      <div class="pin-esp pin-gnd">GND</div>
    </div>
    <div class="resistor-note">
      ⚡ Add a <strong>10kΩ pull-up resistor</strong> between the VCC and DATA pins of the DHT11. Without it the readings will fail or be unstable.
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FILE STRUCTURE -->
<section class="fade-up d3">
  <div class="sec-label">Project</div>
  <div class="sec-title">File structure</div>
  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div>
      <span class="code-lang">project tree</span>
    </div>
    <pre>iot-dashboard/
├── <span class="p">arduino/</span>
│   └── <span class="s">esp32_dht11.ino</span>        <span class="c">← Flash this to your ESP32</span>
├── <span class="p">backend/</span>
│   ├── <span class="n">.env</span>                   <span class="c">← MongoDB URI + PORT</span>
│   ├── <span class="s">package.json</span>
│   └── <span class="s">server.js</span>              <span class="c">← Express + Mongoose API</span>
└── <span class="p">frontend/</span>
    ├── <span class="s">index.html</span>
    ├── <span class="s">package.json</span>
    ├── <span class="s">vite.config.js</span>
    └── <span class="p">src/</span>
        ├── <span class="s">App.jsx</span>                <span class="c">← Polling logic (5s interval)</span>
        ├── <span class="s">index.css</span>              <span class="c">← Global dark theme</span>
        ├── <span class="s">main.jsx</span>
        └── <span class="p">components/</span>
            ├── <span class="s">Dashboard.jsx</span>
            ├── <span class="s">Header.jsx</span>
            ├── <span class="s">KpiCard.jsx</span>
            ├── <span class="s">LiveLineChart.jsx</span>
            ├── <span class="s">GaugeChart.jsx</span>
            ├── <span class="s">DistributionChart.jsx</span>
            ├── <span class="s">StatsPanel.jsx</span>
            ├── <span class="s">AlertsPanel.jsx</span>
            ├── <span class="s">ReadingsTable.jsx</span>
            └── <span class="s">StatusBar.jsx</span></pre>
  </div>
</section>

<div class="divider"></div>

<!-- SETUP STEPS -->
<section class="fade-up d3">
  <div class="sec-label">Setup Guide</div>
  <div class="sec-title">Step-by-step installation</div>
  <div class="steps">

    <div class="step">
      <div class="step-num">01</div>
      <div class="step-body">
        <div class="step-title">Reset MongoDB Atlas password</div>
        <div class="step-desc">Go to <a href="https://cloud.mongodb.com" target="_blank">cloud.mongodb.com</a> → Database Access → Edit your user → set a new password (letters + numbers only, no special chars). Then go to Network Access → Add IP Address → Allow Access From Anywhere (0.0.0.0/0) → Confirm.</div>
      </div>
    </div>

    <div class="step">
      <div class="step-num">02</div>
      <div class="step-body">
        <div class="step-title">Configure backend .env</div>
        <div class="step-desc">Edit <code style="color:var(--orange)">backend/.env</code> and replace YOUR_NEW_PASSWORD:</div>
        <div class="code-wrap" style="margin-top:8px">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">.env</span></div>
          <pre><span class="n">MONGO_URI</span>=<span class="s">mongodb+srv://subhralovesmom123:YOURNEWPASSWORD@cluster0.mpmae1f.mongodb.net/iotdb?appName=Cluster0</span>

<span class="n">PORT</span>=<span class="s">5000</span></pre>
</div>
</div>
</div>

    <div class="step">
      <div class="step-num">03</div>
      <div class="step-body">
        <div class="step-title">Start the backend (Terminal 1)</div>
        <div class="code-wrap" style="margin-top:8px">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">terminal</span></div>
          <pre><span class="k">cd</span> iot-dashboard/backend

<span class="k">npm</span> install
<span class="k">npm</span> run dev
<span class="c"># ✅ MongoDB Atlas connected</span>
<span class="c"># 🚀 Server running on http://localhost:5000</span></pre>
</div>
</div>
</div>

    <div class="step">
      <div class="step-num">04</div>
      <div class="step-body">
        <div class="step-title">Start the frontend (Terminal 2)</div>
        <div class="code-wrap" style="margin-top:8px">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">terminal</span></div>
          <pre><span class="k">cd</span> iot-dashboard/frontend

<span class="k">npm</span> install
<span class="k">npm</span> run dev
<span class="c"># Open http://localhost:5173 in your browser</span></pre>
</div>
</div>
</div>

    <div class="step">
      <div class="step-num">05</div>
      <div class="step-body">
        <div class="step-title">Find your PC's local IP address</div>
        <div class="code-wrap" style="margin-top:8px">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">terminal</span></div>
          <pre><span class="c"># Windows</span>

<span class="k">ipconfig</span>
<span class="c"># Look for: IPv4 Address . . . 192.168.x.x</span>

<span class="c"># Linux / Mac</span>
<span class="k">ip addr show</span> | grep <span class="s">"inet "</span></pre>
</div>
</div>
</div>

    <div class="step">
      <div class="step-num">06</div>
      <div class="step-body">
        <div class="step-title">Install Arduino IDE libraries</div>
        <div class="step-desc">In Arduino IDE → Tools → Manage Libraries, install:<br/>
        • <strong style="color:#fff">DHT sensor library</strong> by Adafruit<br/>
        • <strong style="color:#fff">ArduinoJson</strong> by Benoit Blanchon<br/><br/>
        Board URL for ESP32: <code style="color:var(--green);font-size:11px">https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json</code></div>
      </div>
    </div>

    <div class="step">
      <div class="step-num">07</div>
      <div class="step-body">
        <div class="step-title">Edit and flash the Arduino sketch</div>
        <div class="step-desc" style="margin-bottom:8px">Open <code style="color:var(--orange)">arduino/esp32_dht11.ino</code> and fill in these 3 lines:</div>
        <div class="code-wrap">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">arduino c++</span></div>
          <pre><span class="k">const char*</span> ssid      = <span class="s">"YOUR_WIFI_NAME"</span>;

<span class="k">const char*</span> password = <span class="s">"YOUR_WIFI_PASSWORD"</span>;
<span class="k">const char*</span> serverURL = <span class="s">"http://192.168.1.105:5000/api/sensor"</span>; <span class="c">// your PC IP</span></pre>
</div>
<div class="step-desc" style="margin-top:8px">Then: Tools → Board → <strong style="color:#fff">DOIT ESP32 DEVKIT V1</strong> → select COM port → Upload</div>
</div>
</div>

    <div class="step">
      <div class="step-num">08</div>
      <div class="step-body">
        <div class="step-title">Verify in Serial Monitor</div>
        <div class="code-wrap" style="margin-top:8px">
          <div class="code-bar"><div class="code-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><span class="code-lang">serial monitor @ 115200</span></div>
          <pre><span class="c">Connecting to WiFi......</span>

<span class="p">Connected! IP: 192.168.1.88</span>
<span class="s">Temp: 28.5°C Humidity: 62.0% HeatIdx: 29.1°C</span>
<span class="n">HTTP Status: 201</span> <span class="c">← data saved successfully</span></pre>
</div>
</div>
</div>

  </div>
</section>

<div class="divider"></div>

<!-- API ENDPOINTS -->
<section class="fade-up d4">
  <div class="sec-label">API Reference</div>
  <div class="sec-title">Backend endpoints</div>
  <div class="endpoint"><span class="method post">POST</span><span class="ep-path">/api/sensor</span><span class="ep-desc">ESP32 sends data here every 10s</span></div>
  <div class="endpoint"><span class="method get">GET</span><span class="ep-path">/api/sensor/latest</span><span class="ep-desc">Most recent single reading</span></div>
  <div class="endpoint"><span class="method get">GET</span><span class="ep-path">/api/sensor/history?limit=60</span><span class="ep-desc">Chart data oldest → newest</span></div>
  <div class="endpoint"><span class="method get">GET</span><span class="ep-path">/api/sensor/stats</span><span class="ep-desc">Min / max / avg aggregations</span></div>
  <div class="endpoint"><span class="method get">GET</span><span class="ep-path">/api/sensor/readings?limit=20</span><span class="ep-desc">Table data newest first</span></div>
</section>

<div class="divider"></div>

<!-- SERIAL MONITOR CODES -->
<section class="fade-up d4">
  <div class="sec-label">Debugging</div>
  <div class="sec-title">Serial Monitor messages</div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Message</th><th>Meaning</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Connected! IP: 192.168.x.x</td><td>WiFi connected successfully</td><td class="td-green">✓ Good</td></tr>
        <tr><td>Temp: 28.5°C Humidity: 62.0%</td><td>DHT11 reading correctly</td><td class="td-green">✓ Good</td></tr>
        <tr><td>HTTP Status: 201</td><td>Data saved to MongoDB</td><td class="td-green">✓ Good</td></tr>
        <tr><td>HTTP Status: -1</td><td>Can't reach backend — wrong IP or backend not running</td><td class="td-red">✗ Fix IP</td></tr>
        <tr><td>DHT11 read failed!</td><td>Sensor wiring problem</td><td class="td-orange">⚠ Check wiring</td></tr>
        <tr><td>Connecting to WiFi......</td><td>Stuck — wrong SSID or password</td><td class="td-orange">⚠ Check credentials</td></tr>
      </tbody>
    </table>
  </div>
</section>

<div class="divider"></div>

<!-- TROUBLESHOOTING -->
<section class="fade-up d4">
  <div class="sec-label">Troubleshooting</div>
  <div class="sec-title">Common problems & fixes</div>

  <div class="trouble-item">
    <div class="trouble-icon">🔴</div>
    <div>
      <div class="trouble-prob">MongoDB connection error / IP not whitelisted</div>
      <div class="trouble-fix">Go to Atlas → Network Access → Add IP Address → <code>Allow Access From Anywhere (0.0.0.0/0)</code> → Confirm. Wait 30 seconds then type <code>rs</code> in backend terminal.</div>
    </div>
  </div>

  <div class="trouble-item">
    <div class="trouble-icon">🔴</div>
    <div>
      <div class="trouble-prob">HTTP Status: -1 in Serial Monitor</div>
      <div class="trouble-fix">Your PC's IP changed. Run <code>ipconfig</code> again, update the IP in the Arduino sketch, and re-upload. Make sure your backend is running.</div>
    </div>
  </div>

  <div class="trouble-item">
    <div class="trouble-icon">🟡</div>
    <div>
      <div class="trouble-prob">Dashboard shows OFFLINE</div>
      <div class="trouble-fix">Backend is not running. Open a terminal, <code>cd backend</code>, run <code>npm run dev</code>. Both terminals must be open at the same time.</div>
    </div>
  </div>

  <div class="trouble-item">
    <div class="trouble-icon">🟡</div>
    <div>
      <div class="trouble-prob">DHT11 read failed / NaN values</div>
      <div class="trouble-fix">Check your wiring. Make sure the 10kΩ pull-up resistor is connected between VCC and DATA. Try a different GPIO pin and update <code>#define DHTPIN</code>.</div>
    </div>
  </div>

  <div class="trouble-item">
    <div class="trouble-icon">🟡</div>
    <div>
      <div class="trouble-prob">ECONNREFUSED error in Vite terminal</div>
      <div class="trouble-fix">The frontend proxy can't find the backend. Start backend first: <code>cd backend && npm run dev</code>. Both servers must be running simultaneously.</div>
    </div>
  </div>

  <div class="trouble-item">
    <div class="trouble-icon">🔵</div>
    <div>
      <div class="trouble-prob">Blue LED is ON on ESP32</div>
      <div class="trouble-fix">This is normal and correct! It means WiFi is connected. The code sets <code>GPIO2 HIGH</code> after a successful WiFi connection.</div>
    </div>
  </div>

</section>

<div class="divider"></div>

<!-- TECH STACK -->
<section class="fade-up d4">
  <div class="sec-label">Stack</div>
  <div class="sec-title">Technologies used</div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td>Hardware</td><td class="td-green">ESP32 + DHT11</td><td>Reads temperature & humidity, sends over WiFi</td></tr>
        <tr><td>Firmware</td><td class="td-orange">Arduino C++ (HTTPClient + ArduinoJson)</td><td>Packages and POSTs sensor data every 10s</td></tr>
        <tr><td>Backend</td><td class="td-orange">Node.js + Express</td><td>REST API receiving and serving sensor data</td></tr>
        <tr><td>ORM</td><td class="td-green">Mongoose</td><td>Schema validation and MongoDB queries</td></tr>
        <tr><td>Database</td><td class="td-green">MongoDB Atlas</td><td>Cloud storage for all sensor readings</td></tr>
        <tr><td>Frontend</td><td class="td-green">React 18 + Vite</td><td>Fast dev server, component-based UI</td></tr>
        <tr><td>Charts</td><td class="td-green">Recharts</td><td>Line, area, bar, gauge charts</td></tr>
        <tr><td>HTTP Client</td><td class="td-green">Axios</td><td>Frontend polling every 5s</td></tr>
      </tbody>
    </table>
  </div>
</section>

</div><!-- /wrap -->

<footer>
  <div class="wrap">
    <div class="footer-logo">⬡ IoT DASHBOARD</div>
    <div class="footer-sub">ESP32 · DHT11 · MongoDB Atlas · React Vite · Built with ❤️</div>
  </div>
</footer>

<script>
// Intersection observer for fade-up animations on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
      e.target.style.opacity = '1';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => {
  el.style.animationPlayState = 'paused';
  obs.observe(el);
});
</script>
</body>
</html>

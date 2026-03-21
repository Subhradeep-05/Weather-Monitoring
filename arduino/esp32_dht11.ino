#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

// ── Config ──────────────────────────────────────────────
#define DHTPIN     4
#define DHTTYPE    DHT11
#define LED_PIN    2

const char* ssid       = "Hi";
const char* password   = "Dey@2005";
const char* serverURL  = "http://10.112.6.200:5000/api/sensor";
// ────────────────────────────────────────────────────────

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();

  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
  digitalWrite(LED_PIN, HIGH);
}

void loop() {
  delay(10000); // Send every 10 seconds

  float humidity    = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("DHT11 read failed!");
    digitalWrite(LED_PIN, LOW);
    delay(2000);
    digitalWrite(LED_PIN, HIGH);
    return;
  }

  float heatIndex = dht.computeHeatIndex(temperature, humidity, false);

  Serial.printf("Temp: %.1f°C  Humidity: %.1f%%  HeatIdx: %.1f°C\n",
                temperature, humidity, heatIndex);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["temperature"] = temperature;
    doc["humidity"]    = humidity;
    doc["heatIndex"]   = heatIndex;
    doc["deviceId"]    = "esp32-01";

    String payload;
    serializeJson(doc, payload);

    int httpCode = http.POST(payload);
    Serial.println("HTTP Status: " + String(httpCode));
    http.end();
  }
}

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <SocketIoClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;
const int left_pin = 5;
const int right_pin = 2;
const int up_pin = 4;
const int down_pin = 0;
bool left_state = 0;
bool right_state = 0;
bool up_state = 0;
bool down_state = 0;


void messageEvenetHandler(const char * payload, size_t length) {
  USE_SERIAL.printf("got message: %s\n", payload);
  if (strcmp(payload, "Left") == 0) {
    left_state = 1;
  }
  if (strcmp(payload, "Right") == 0) {
    right_state = 1;
  }
  if (strcmp(payload, "Up") == 0) {
    up_state = 1;
  }
  if (strcmp(payload, "Down") == 0) {
    down_state = 1;
  }
  if (strcmp(payload, "Stop") == 0) {
    left_state = 0;
    right_state = 0;
    up_state = 0;
    down_state = 0;
  }
}

void setup() {
  pinMode(left_pin, OUTPUT);
  pinMode(right_pin, OUTPUT);
  pinMode(down_pin, OUTPUT);
  pinMode(up_pin, OUTPUT);
  digitalWrite(left_pin, 0);
  digitalWrite(right_pin, 0);
  digitalWrite(up_pin, 0);
  digitalWrite(down_pin, 0);
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();
  
  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
  WiFiMulti.addAP("Minh Nam", "87654321");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  webSocket.begin("172.20.10.10", 8080);
  webSocket.on("reply", messageEvenetHandler);

  // use HTTP Basic Authorization this is optional remove if not needed
  //webSocket.setAuthorization("username", "password");
}


void loop() {
  webSocket.loop();
  digitalWrite(left_pin, left_state);
  digitalWrite(right_pin, right_state);
  digitalWrite(up_pin, up_state);
  digitalWrite(down_pin, down_state);
}

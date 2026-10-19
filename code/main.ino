/*
 * Fab Academy 2026 - Final Project Firmware
 * Student: Daniel Haro (FabLab UContinental)
 * Description: Control Lazo Cerrado PID con Lectura de Temperatura ESP32
 */

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define SENSOR_PIN 4
#define PWM_OUTPUT_PIN 16

OneWire oneWire(SENSOR_PIN);
DallasTemperature sensors(&oneWire);

// Parámetros del Controlador PID
float setpoint = 37.5; // Grados Celsius objetivo
float Kp = 2.5;
float Ki = 0.2;
float Kd = 1.2;

float errorPrevio = 0;
float errorAcumulado = 0;

void setup() {
    Serial.begin(115200);
    sensors.begin();
    
    // Configuración PWM en ESP32
    ledcAttachChannel(PWM_OUTPUT_PIN, 5000, 8, 0); // 5kHz, 8-bit
    Serial.println(">>> Sistema de Control Iniciado <<<");
}

void loop() {
    sensors.requestTemperatures();
    float temperaturaActual = sensors.getTempCByIndex(0);
    
    if (temperaturaActual == DEVICE_DISCONNECTED_C) {
        Serial.println("Error: Sensor no detectado!");
        ledcWrite(PWM_OUTPUT_PIN, 0);
        delay(1000);
        return;
    }

    // Cálculo PID
    float error = setpoint - temperaturaActual;
    errorAcumulado += error;
    errorAcumulado = constrain(errorAcumulado, -100, 100); // Anti-windup
    
    float derivada = error - errorPrevio;
    float salidaControl = (Kp * error) + (Ki * errorAcumulado) + (Kd * derivada);
    
    // Mapeo a ciclo de trabajo PWM (0 - 255)
    uint32_t pwmValue = (uint32_t)constrain(salidaControl, 0, 255);
    ledcWrite(PWM_OUTPUT_PIN, pwmValue);
    
    errorPrevio = error;

    // Telemetría por Serial
    Serial.print("Setpoint: "); Serial.print(setpoint);
    Serial.print(" | Actual: "); Serial.print(temperaturaActual);
    Serial.print(" | PWM: "); Serial.println(pwmValue);

    delay(500);
}

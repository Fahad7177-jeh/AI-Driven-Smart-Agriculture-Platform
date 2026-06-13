import requests

url = "http://127.0.0.1:8003/predict"

payload = {
    "Soil_Type": 0,
    "Soil_pH": 6.14,
    "Soil_Moisture": 36.48,
    "Organic_Carbon": 0.42,
    "Electrical_Conductivity": 2.17,
    "Temperature_C": 21.9,
    "Humidity": 31.19,
    "Rainfall_mm": 1167.7,
    "Sunlight_Hours": 4.01,
    "Wind_Speed_kmh": 1.97,
    "Crop_Type": 5,
    "Crop_Growth_Stage": 3,
    "Season": 1,
    "Irrigation_Type": 2,
    "Water_Source": 2,
    "Field_Area_hectare": 4.73,
    "Mulching_Used": 1,
    "Previous_Irrigation_mm": 1.98,
    "Region": 3
}

response = requests.post(url, json=payload)

print(response.json())
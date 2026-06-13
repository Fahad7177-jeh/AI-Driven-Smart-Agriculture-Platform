import requests

url = "http://127.0.0.1:8002/predict"

data = {
    "temperature": 30,
    "humidity": 60,
    "moisture": 40,
    "soil_type": "Sandy",
    "crop_type": "Maize",
    "nitrogen": 37,
    "potassium": 0,
    "phosphorous": 20
}

response = requests.post(url, json=data)

print(response.json())
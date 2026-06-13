import requests

url = "http://127.0.0.1:8004/predict"

payload = {
    "crop": "Wheat",
    "rainfall": 1200,
    "pesticides": 100,
    "temperature": 25
}

response = requests.post(url, json=payload)

print(response.json())
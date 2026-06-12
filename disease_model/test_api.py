import requests

url = "http://127.0.0.1:8001/predict"

files = {
    "image": open(
        r"C:\Users\Shaik Fahad Jahangir\Dropbox\smart ai farming\datasets\PlantVillage\Potato___Early_blight\0a47f32c-1724-4c8d-bfe4-986cedd3587b___RS_Early.B 8001.JPG",
        "rb"
    )
}

response = requests.post(url, files=files)

print(response.json())
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("crop_yield_prediction_model.pkl")

# Crop mapping
crop_mapping = {
    "Cassava": 0,
    "Maize": 1,
    "Plantains and others": 2,
    "Potatoes": 3,
    "Rice, paddy": 4,
    "Sorghum": 5,
    "Soybeans": 6,
    "Sweet potatoes": 7,
    "Wheat": 8,
    "Yams": 9
}

INDIA_CODE = 42

@app.route("/")
def home():
    return "Yield Prediction API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.json

        crop = data["crop"]
        rainfall = float(data["rainfall"])
        pesticides = float(data["pesticides"])
        temperature = float(data["temperature"])

        if crop not in crop_mapping:
            return jsonify({
                "success": False,
                "error": "Invalid crop name"
            })

        crop_code = crop_mapping[crop]

        sample = [[
            INDIA_CODE,
            crop_code,
            rainfall,
            pesticides,
            temperature
        ]]

        prediction = model.predict(sample)

        return jsonify({
            "success": True,
            "predicted_yield": round(float(prediction[0]), 2)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True, port=8004)
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("fertilizer_recommendation_model.pkl")

# Load fertilizer encoder
encoder = joblib.load("fertilizer_encoder.pkl")


soil_mapping = {
    "Sandy": 0,
    "Loamy": 1,
    "Black": 2,
    "Red": 3,
    "Clayey": 4
}

crop_mapping = {
    "Maize": 0,
    "Sugarcane": 1,
    "Cotton": 2,
    "Tobacco": 3,
    "Paddy": 4,
    "Barley": 5,
    "Wheat": 6,
    "Millets": 7,
    "Oil seeds": 8,
    "Pulses": 9,
    "Ground Nuts": 10
}


@app.route("/")
def home():
    return "Fertilizer Recommendation API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.json

        sample = [[
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["moisture"]),
            soil_mapping[data["soil_type"]],
            crop_mapping[data["crop_type"]],
            float(data["nitrogen"]),
            float(data["potassium"]),
            float(data["phosphorous"])
        ]]

        prediction = model.predict(sample)

        fertilizer = encoder.inverse_transform(prediction)[0]

        return jsonify({
            "success": True,
            "fertilizer": fertilizer
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True, port=8002)
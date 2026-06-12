from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


app = Flask(__name__)
CORS(app)

model = joblib.load("crop_recommendation_model.pkl")

@app.route("/")
def home():
    return "Crop Recommendation API Running"

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    sample = [[
        data["N"],
        data["P"],
        data["K"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"]
    ]]

    prediction = model.predict(sample)

    return jsonify({
        "recommended_crop": str(prediction[0])
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)
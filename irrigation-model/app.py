from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("irrigation_recommendation_model.pkl")

@app.route("/")
def home():
    return "Irrigation Recommendation API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.json

        sample = [[
            int(data["Soil_Type"]),
            float(data["Soil_pH"]),
            float(data["Soil_Moisture"]),
            float(data["Organic_Carbon"]),
            float(data["Electrical_Conductivity"]),
            float(data["Temperature_C"]),
            float(data["Humidity"]),
            float(data["Rainfall_mm"]),
            float(data["Sunlight_Hours"]),
            float(data["Wind_Speed_kmh"]),
            int(data["Crop_Type"]),
            int(data["Crop_Growth_Stage"]),
            int(data["Season"]),
            int(data["Irrigation_Type"]),
            int(data["Water_Source"]),
            float(data["Field_Area_hectare"]),
            int(data["Mulching_Used"]),
            float(data["Previous_Irrigation_mm"]),
            int(data["Region"])
        ]]

        prediction = model.predict(sample)[0]

        irrigation_map = {
            0: "Low",
            1: "Medium",
            2: "High"
        }

        return jsonify({
            "success": True,
            "irrigation_need": irrigation_map[int(prediction)]
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })

if __name__ == "__main__":
    app.run(debug=True, port=8003)
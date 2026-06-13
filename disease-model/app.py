from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model
model = load_model("plant_disease_detection_model.h5")

# Load class names
with open("class_names.pkl", "rb") as f:
    class_names = pickle.load(f)

@app.route("/")
def home():
    return jsonify({
        "message": "Disease Detection API Running"
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:

        # Check image uploaded
        if "image" not in request.files:
            return jsonify({
                "success": False,
                "error": "No image uploaded"
            }), 400

        image = request.files["image"]

        # Open image
        img = Image.open(image).convert("RGB")

        # IMPORTANT: same size used during training
        img = img.resize((128, 128))

        # Convert to array
        img_array = np.array(img, dtype=np.float32)

        # Normalize
        img_array = img_array / 255.0

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)

        print("Input Shape:", img_array.shape)

        # Predict
        prediction = model.predict(img_array)

        predicted_class = int(np.argmax(prediction))

        confidence = float(np.max(prediction) * 100)

        disease = class_names[predicted_class]

        return jsonify({
            "success": True,
            "disease": disease,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8001, debug=False)
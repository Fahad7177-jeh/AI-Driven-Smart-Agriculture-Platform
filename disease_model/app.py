from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Load Model
model = load_model("plant_disease_detection_model.h5")

# Load Class Names
with open("class_names.pkl", "rb") as f:
    class_names = pickle.load(f)

@app.route("/")
def home():
    return "Disease Detection API Running"

@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    img = Image.open(image)
    img = img.resize((224, 224))

    img_array = np.array(img)

    if len(img_array.shape) == 2:
        img_array = np.stack((img_array,) * 3, axis=-1)

    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)

    disease = class_names[predicted_class]

    return jsonify({
        "disease": disease
    })

if __name__ == "__main__":
    app.run(debug=True, port=8001)
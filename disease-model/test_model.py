from tensorflow.keras.models import load_model
import pickle

model = load_model("plant_disease_detection_model.h5")

with open("class_names.pkl", "rb") as f:
    class_names = pickle.load(f)

print("Model Loaded Successfully")
print("Total Classes:", len(class_names))
print(class_names[:5])
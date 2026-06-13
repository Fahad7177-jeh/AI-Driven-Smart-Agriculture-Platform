import { useState } from "react";
import axios from "axios";

function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [crop, setCrop] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }
      );

      setCrop(data.recommended_crop);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Crop Recommendation</h1>

      <form onSubmit={handlePredict}>
        <input
          type="number"
          name="N"
          placeholder="Nitrogen"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="P"
          placeholder="Phosphorus"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="K"
          placeholder="Potassium"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="temperature"
          placeholder="Temperature"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="ph"
          placeholder="pH"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="rainfall"
          placeholder="Rainfall"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Predict Crop</button>
      </form>

      {crop && (
        <h2 style={{ marginTop: "20px" }}>
          Recommended Crop: {crop}
        </h2>
      )}
    </div>
  );
}

export default CropRecommendation;
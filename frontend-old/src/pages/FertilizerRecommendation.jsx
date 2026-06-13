import { useState } from "react";
import axios from "axios";

function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    potassium: "",
    phosphorous: "",
  });

  const [fertilizer, setFertilizer] = useState("");

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
        "http://127.0.0.1:8002/predict",
        formData
      );

      setFertilizer(data.fertilizer);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Fertilizer Recommendation</h1>

      <form onSubmit={handlePredict}>
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
          name="moisture"
          placeholder="Moisture"
          onChange={handleChange}
        />
        <br /><br />

        <select
          name="soil_type"
          onChange={handleChange}
        >
          <option value="">Select Soil Type</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
          <option value="Clayey">Clayey</option>
        </select>

        <br /><br />

        <select
          name="crop_type"
          onChange={handleChange}
        >
          <option value="">Select Crop</option>
          <option value="Maize">Maize</option>
          <option value="Sugarcane">Sugarcane</option>
          <option value="Cotton">Cotton</option>
          <option value="Tobacco">Tobacco</option>
          <option value="Paddy">Paddy</option>
          <option value="Barley">Barley</option>
          <option value="Wheat">Wheat</option>
          <option value="Millets">Millets</option>
          <option value="Oil seeds">Oil Seeds</option>
          <option value="Pulses">Pulses</option>
          <option value="Ground Nuts">Ground Nuts</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="nitrogen"
          placeholder="Nitrogen"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="potassium"
          placeholder="Potassium"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="phosphorous"
          placeholder="Phosphorous"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Recommend Fertilizer
        </button>
      </form>

      {fertilizer && (
        <h2 style={{ marginTop: "20px" }}>
          Recommended Fertilizer: {fertilizer}
        </h2>
      )}
    </div>
  );
}

export default FertilizerRecommendation;
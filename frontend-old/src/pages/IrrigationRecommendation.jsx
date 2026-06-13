import { useState } from "react";
import axios from "axios";

function IrrigationRecommendation() {
  const [formData, setFormData] = useState({
    soil_type: "",
    soil_ph: "",
    soil_moisture: "",
    organic_carbon: "",
    electrical_conductivity: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    sunlight_hours: "",
    wind_speed: "",
    crop_type: "",
    crop_growth_stage: "",
    season: "",
    irrigation_type: "",
    water_source: "",
    field_area: "",
    mulching_used: "",
    previous_irrigation: "",
    region: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictIrrigation = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8003/predict",
        formData
      );

      setResult(data.irrigation_need);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Irrigation Recommendation</h1>

      <form onSubmit={predictIrrigation}>

        <input
          name="soil_ph"
          placeholder="Soil pH"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="soil_moisture"
          placeholder="Soil Moisture"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="organic_carbon"
          placeholder="Organic Carbon"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="electrical_conductivity"
          placeholder="Electrical Conductivity"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="temperature"
          placeholder="Temperature"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="humidity"
          placeholder="Humidity"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="rainfall"
          placeholder="Rainfall"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="sunlight_hours"
          placeholder="Sunlight Hours"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="wind_speed"
          placeholder="Wind Speed"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Predict Irrigation Need
        </button>
      </form>

      {result && (
        <h2 style={{ marginTop: "20px" }}>
          Irrigation Need: {result}
        </h2>
      )}
    </div>
  );
}

export default IrrigationRecommendation;
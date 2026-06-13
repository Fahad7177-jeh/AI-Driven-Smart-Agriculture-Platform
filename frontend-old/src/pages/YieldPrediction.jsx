import { useState } from "react";
import axios from "axios";

function YieldPrediction() {
  const [crop, setCrop] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [pesticides, setPesticides] = useState("");
  const [temperature, setTemperature] = useState("");

  const [yieldResult, setYieldResult] = useState("");

  const predictYield = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8004/predict",
        {
          crop,
          rainfall: Number(rainfall),
          pesticides: Number(pesticides),
          temperature: Number(temperature),
        }
      );

      setYieldResult(data.predicted_yield);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <h1>Yield Prediction</h1>

      <form onSubmit={predictYield}>
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          required
        >
          <option value="">Select Crop</option>
          <option value="Cassava">Cassava</option>
          <option value="Maize">Maize</option>
          <option value="Plantains and others">
            Plantains and others
          </option>
          <option value="Potatoes">Potatoes</option>
          <option value="Rice, paddy">Rice, paddy</option>
          <option value="Sorghum">Sorghum</option>
          <option value="Soybeans">Soybeans</option>
          <option value="Sweet potatoes">
            Sweet potatoes
          </option>
          <option value="Wheat">Wheat</option>
          <option value="Yams">Yams</option>
        </select>

        <br />
        <br />

        <input
          type="number"
          placeholder="Rainfall"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Pesticides"
          value={pesticides}
          onChange={(e) => setPesticides(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Predict Yield
        </button>
      </form>

      {yieldResult && (
        <h2 style={{ marginTop: "20px" }}>
          Predicted Yield: {yieldResult}
        </h2>
      )}
    </div>
  );
}

export default YieldPrediction;
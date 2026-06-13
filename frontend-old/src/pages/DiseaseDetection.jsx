import { useState } from "react";
import axios from "axios";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [disease, setDisease] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "http://127.0.0.1:8001/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDisease(data.disease);

    } catch (error) {
      console.log(error);
      alert("Disease Detection Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Disease Detection</h1>

      <form onSubmit={handlePredict}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">
          Detect Disease
        </button>
      </form>

      {disease && (
        <h2 style={{ marginTop: "20px" }}>
          Predicted Disease: {disease}
        </h2>
      )}
    </div>
  );
}

export default DiseaseDetection;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import ProtectedRoute from "./components/ProtectedRoute";
import DiseaseDetection from "./pages/DiseaseDetection";
import YieldPrediction from "./pages/YieldPrediction";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import IrrigationRecommendation from "./pages/IrrigationRecommendation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-recommendation"
          element={
            <ProtectedRoute>
              <CropRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
  path="/disease-detection"
  element={
    <ProtectedRoute>
      <DiseaseDetection />
    </ProtectedRoute>
  }
/>
<Route
  path="/yield-prediction"
  element={
    <ProtectedRoute>
      <YieldPrediction />
    </ProtectedRoute>
  }
/>
<Route
  path="/fertilizer-recommendation"
  element={
    <ProtectedRoute>
      <FertilizerRecommendation />
    </ProtectedRoute>
  }
/>

<Route
  path="/irrigation-recommendation"
  element={
    <ProtectedRoute>
      <IrrigationRecommendation />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
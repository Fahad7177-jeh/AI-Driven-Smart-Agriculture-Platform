require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const app = express();

app.use("/api/test", testRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("SMART AI FARMING BACKEND RUNNING");
});

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
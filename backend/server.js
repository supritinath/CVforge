const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cvRoutes = require("./routes/cvRoutes");

dotenv.config();

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/cvs", cvRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.json({
    message: "CVForge backend is running",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CVForge backend running on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ===============================
// DATABASE CONNECTION
// ===============================
require("./config/db");

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

// 🔥 FIX CORS for Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://personal-portfolio-ten-tau-27.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===============================
// STATIC FILES (IMAGES)
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// ROUTES
// ===============================
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// ===============================
// HEALTH CHECK ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
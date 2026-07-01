const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Database
require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Test
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
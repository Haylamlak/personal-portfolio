const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("========== AUTH DEBUG ==========");
  console.log("Authorization Header:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, "secretkey123");

    console.log("Decoded:", decoded);

    req.admin = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
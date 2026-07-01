const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const admin = results[0];

    const isMatch = password === admin.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      "secretkey123",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  });
};
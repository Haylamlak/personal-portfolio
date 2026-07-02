// const db = require("../config/db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // LOGIN
// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT * FROM admin WHERE username = ?";

//   db.query(sql, [username], async (err, results) => {
//     if (err) return res.status(500).json({ message: "DB error" });

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid username" });
//     }

//     const admin = results[0];

//     const isMatch = password === admin.password;

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: admin.id, username: admin.username },
//       "secretkey123",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   });
// };
//////////////////////
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ===============================
// LOGIN
// ===============================

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  try {
    // Find admin
    const result = await db.query(
      "SELECT * FROM admin WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const admin = result.rows[0];

    // ===============================
    // PASSWORD CHECK (bcrypt SAFE)
    // ===============================

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ===============================
    // CREATE JWT TOKEN
    // ===============================

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful 🚀",
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};
// const db = require("../config/db");

// // SEND MESSAGE
// exports.sendMessage = (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql =
//     "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

//   db.query(sql, [name, email, message], (err) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", err });
//     }

//     res.json({ message: "Message sent successfully 🚀" });
//   });
// };

// // GET ALL MESSAGES
// exports.getMessages = (req, res) => {
//   const sql = "SELECT * FROM contacts ORDER BY id DESC";

//   db.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", err });
//     }

//     res.json(results);
//   });
// };

// // DELETE MESSAGE
// exports.deleteMessage = (req, res) => {
//   const { id } = req.params;

//   const sql = "DELETE FROM contacts WHERE id = ?";

//   db.query(sql, [id], (err) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", err });
//     }

//     res.json({ message: "Message deleted 🗑️" });
//   });
// };

// // UPDATE MESSAGE
// exports.updateMessage = (req, res) => {
//   const { id } = req.params;
//   const { name, email, message } = req.body;

//   const sql =
//     "UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?";

//   db.query(sql, [name, email, message, id], (err) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", err });
//     }

//     res.json({ message: "Message updated ✏️" });
//   });
// };

// // STATS
// exports.getStats = (req, res) => {
//   const sql = "SELECT COUNT(*) AS totalMessages FROM contacts";

//   db.query(sql, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", err });
//     }

//     res.json(result[0]);
//   });
// };

///////////////////
const db = require("../config/db");

// ===============================
// SEND MESSAGE
// ===============================

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO contacts (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, message]
    );

    res.json({
      message: "Message sent successfully 🚀",
      data: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

// ===============================
// GET ALL MESSAGES
// ===============================

exports.getMessages = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM contacts ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

// ===============================
// DELETE MESSAGE
// ===============================

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({
      message: "Message deleted 🗑️",
      deleted: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

// ===============================
// UPDATE MESSAGE
// ===============================

exports.updateMessage = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  try {
    const result = await db.query(
      `
      UPDATE contacts
      SET name = $1,
          email = $2,
          message = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, email, message, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({
      message: "Message updated ✏️",
      data: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

// ===============================
// STATS
// ===============================

exports.getStats = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT COUNT(*) AS totalmessages FROM contacts"
    );

    res.json({
      totalMessages: result.rows[0].totalmessages,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

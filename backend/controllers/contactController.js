const db = require("../config/db");

// SEND MESSAGE
exports.sendMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    res.json({ message: "Message sent successfully 🚀" });
  });
};

// GET ALL MESSAGES
exports.getMessages = (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    res.json(results);
  });
};

// DELETE MESSAGE
exports.deleteMessage = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    res.json({ message: "Message deleted 🗑️" });
  });
};

// UPDATE MESSAGE
exports.updateMessage = (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  const sql =
    "UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?";

  db.query(sql, [name, email, message, id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    res.json({ message: "Message updated ✏️" });
  });
};

// STATS
exports.getStats = (req, res) => {
  const sql = "SELECT COUNT(*) AS totalMessages FROM contacts";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    res.json(result[0]);
  });
};
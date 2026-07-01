const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  deleteMessage,
  updateMessage,
  getStats,
} = require("../controllers/contactController");

const auth = require("../middleware/authMiddleware");

// PUBLIC
router.post("/", sendMessage);

// PROTECTED (ADMIN ONLY)
router.get("/", auth, getMessages);
router.delete("/:id", auth, deleteMessage);
router.put("/:id", auth, updateMessage);
router.get("/stats", auth, getStats);

module.exports = router;
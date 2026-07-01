const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Public
router.get("/", getProjects);

// Protected
router.post("/", auth, addProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
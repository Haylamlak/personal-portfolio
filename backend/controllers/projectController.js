
const db = require("../config/db");

// ===============================
// GET ALL PROJECTS
// ===============================

exports.getProjects = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error",
    });
  }
};

// ===============================
// ADD PROJECT
// ===============================

exports.addProject = async (req, res) => {
  const {
    title,
    description,
    category,
    image,
    github,
    demo,
    technologies,
  } = req.body;

  // validation (IMPORTANT)
  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO projects
      (title, description, category, image, github, demo, technologies)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        title,
        description,
        category,
        image,
        github,
        demo,
        technologies,
      ]
    );

    res.json({
      message: "Project added successfully 🚀",
      project: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error",
    });
  }
};

// ===============================
// UPDATE PROJECT
// ===============================

exports.updateProject = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    category,
    image,
    github,
    demo,
    technologies,
  } = req.body;

  try {
    const result = await db.query(
      `
      UPDATE projects
      SET
        title=$1,
        description=$2,
        category=$3,
        image=$4,
        github=$5,
        demo=$6,
        technologies=$7
      WHERE id=$8
      RETURNING *
      `,
      [
        title,
        description,
        category,
        image,
        github,
        demo,
        technologies,
        id,
      ]
    );

    // if no project found
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully ✏️",
      project: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error",
    });
  }
};

// ===============================
// DELETE PROJECT
// ===============================

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM projects WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully 🗑️",
      deleted: result.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error",
    });
  }
};
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

  try {
    await db.query(
      `
      INSERT INTO projects
      (
        title,
        description,
        category,
        image,
        github,
        demo,
        technologies
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
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

    await db.query(
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

    res.json({
      message: "Project updated successfully ✏️",
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

    await db.query(
      "DELETE FROM projects WHERE id=$1",
      [id]
    );

    res.json({
      message: "Project deleted successfully 🗑️",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Database error",
    });

  }

};
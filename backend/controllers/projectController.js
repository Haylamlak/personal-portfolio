const db = require("../config/db");

// GET ALL PROJECTS
exports.getProjects = (req, res) => {
  const sql = "SELECT * FROM projects ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ADD PROJECT
exports.addProject = (req, res) => {
  const {
    title,
    description,
    category,
    image,
    github,
    demo,
    technologies,
  } = req.body;

  const sql = `
    INSERT INTO projects
    (title, description, category, image, github, demo, technologies)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, category, image, github, demo, technologies],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Project added successfully 🚀",
      });
    }
  );
};

// UPDATE PROJECT
exports.updateProject = (req, res) => {
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

  const sql = `
    UPDATE projects
    SET
      title=?,
      description=?,
      category=?,
      image=?,
      github=?,
      demo=?,
      technologies=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      title,
      description,
      category,
      image,
      github,
      demo,
      technologies,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Project updated successfully ✏️",
      });
    }
  );
};

// DELETE PROJECT
exports.deleteProject = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM projects WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Project deleted successfully 🗑️",
      });
    }
  );
};
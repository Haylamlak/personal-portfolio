import { useState, useEffect } from "react";
import "./ProjectManager.css";

const BASE_URL = "https://portfoliobackend-qjog.onrender.com";

function ProjectManager() {
  const emptyProject = {
    title: "",
    description: "",
    category: "",
    image: "",
    github: "",
    demo: "",
    technologies: "",
  };

  const [project, setProject] = useState(emptyProject);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // =============================
  // Load Projects
  // =============================
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // Input Change
  // =============================
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // IMAGE UPLOAD
  // =============================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setProject((prev) => ({
        ...prev,
        image: data.image,
      }));

      alert("Image uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  // =============================
  // ADD PROJECT
  // =============================
  const addProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(project),
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        fetchProjects();
        setProject(emptyProject);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // EDIT
  // =============================
  const editProject = (item) => {
    setEditingId(item.id);

    setProject({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      github: item.github,
      demo: item.demo,
      technologies: item.technologies,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =============================
  // UPDATE
  // =============================
  const updateProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/projects/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(project),
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        fetchProjects();
        setEditingId(null);
        setProject(emptyProject);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // DELETE
  // =============================
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="project-manager">

      <h1>
        {editingId ? "Update Project" : "Project Manager"}
      </h1>

      <form onSubmit={editingId ? updateProject : addProject}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={project.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="frontend / fullstack"
          value={project.category}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {project.image && (
          <img
            src={`${BASE_URL}${project.image}`}
            alt="Preview"
            style={{
              width: "220px",
              height: "140px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "15px",
              border: "2px solid #38bdf8",
            }}
          />
        )}

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={project.github}
          onChange={handleChange}
        />

        <input
          type="text"
          name="demo"
          placeholder="Live Demo URL"
          value={project.demo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="technologies"
          placeholder="React, Node.js, Express"
          value={project.technologies}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setProject(emptyProject);
            }}
          >
            Cancel
          </button>
        )}

      </form>

      <hr />

      <h2>All Projects</h2>

      <div className="projects-list">

        {projects.map((item) => (
          <div key={item.id} className="project-item">

            <img src={item.image} alt={item.title} />

            <div className="project-info">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <small>{item.technologies}</small>
            </div>

            <div className="action-buttons">
              <button onClick={() => editProject(item)}>Edit</button>
              <button onClick={() => deleteProject(item.id)}>Delete</button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProjectManager;
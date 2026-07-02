import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH PROJECT FROM API
  // =============================
  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();

      const found = data.find((p) => p.id === Number(id));
      setProject(found);

      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  // =============================
  // LOADING STATE
  // =============================
  if (loading) return <h2>Loading project...</h2>;

  if (!project) return <h2>Project not found</h2>;

  return (
    <div className="project-details">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="details-container">

        {/* IMAGE */}
        <img
          src={
            project.image?.startsWith("http")
              ? project.image
              : `${BASE_URL}${project.image}`
          }
          alt={project.title}
        />

        {/* TITLE */}
        <h1>{project.title}</h1>

        {/* DESCRIPTION */}
        <p>{project.description}</p>

        {/* TECHNOLOGIES */}
        <h3>Technologies</h3>

        <div className="tech-list">
          {project.technologies
            ?.split(",")
            .map((tech, index) => (
              <span key={index}>{tech.trim()}</span>
            ))}
        </div>

        {/* BUTTONS */}
        <div className="buttons">

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>

        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;
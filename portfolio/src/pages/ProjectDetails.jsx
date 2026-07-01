import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return <h2>Project not found</h2>;
  }

  return (
    <div className="project-details">

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="details-container">

        <img src={project.image} alt={project.title} />

        <h1>{project.title}</h1>

        <p>{project.description}</p>

        <h3>Technologies</h3>

        <div className="tech-list">
          {project.tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>

        <div className="buttons">

          <a href={project.github} target="_blank">
            GitHub
          </a>

          <a href={project.demo} target="_blank">
            Live Demo
          </a>

        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;
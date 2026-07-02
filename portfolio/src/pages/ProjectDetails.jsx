import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id));
        setProject(found);
      });
  }, [id]);

  if (!project) return <h2>Loading...</h2>;

  return (
    <div className="project-details">

      <button onClick={() => navigate("/")}>← Back</button>

      <img
        src={`${BASE_URL}${project.image}`}
        alt={project.title}
      />

      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <h3>Technologies</h3>

      <div>
        {project.technologies?.split(",").map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>

      <a href={project.github}>GitHub</a>
      <a href={project.demo}>Live</a>

    </div>
  );
}

export default ProjectDetails;
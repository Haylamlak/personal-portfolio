import "./Projects.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";


function Projects() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();

      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) =>
          p.category
            .replace(/\s+/g, "")
            .toLowerCase() === filter.toLowerCase()
        );

  if (loading) {
    return (
      <section className="projects">
        <h2>Loading Projects...</h2>
      </section>
    );
  }

  return (
    <section className="projects" id="projects">

      <div className="section-title">
        <h2>My Projects</h2>
        <p>Some of my recent work</p>
      </div>

      <div className="filter-buttons">

        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "frontend" ? "active" : ""}
          onClick={() => setFilter("frontend")}
        >
          Frontend
        </button>

        <button
          className={filter === "fullstack" ? "active" : ""}
          onClick={() => setFilter("fullstack")}
        >
          Full Stack
        </button>

      </div>

      <div className="project-grid">

        {filteredProjects.map((project, index) => (

          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >

            <div
              className="project-img"
              onClick={() => navigate(`/project/${project.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`${BASE_URL}${project.image}`}
                alt={project.title}
              />

            </div>

            <div className="project-content">

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">

                {project.technologies
                  ?.split(",")
                  .map((tech, index) => (
                    <span key={index}>
                      {tech.trim()}
                    </span>
                  ))}

              </div>

              <div className="project-buttons">

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

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Projects;
import "./Skills.css";

import { motion } from "framer-motion";

import {
  frontendSkills,
  backendSkills,
  toolsSkills,
} from "../../data/skills";

function Skills() {
  return (
    <section className="skills" id="skills">

      {/* Title */}

      <div className="section-title">
        <h2>My Skills</h2>
        <p>Technologies I work with</p>
      </div>

      <div className="skills-container">

        {/* FRONTEND */}

        <motion.div
          className="skills-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          <h3>Frontend</h3>

          {frontendSkills.map((skill, index) => (
            <div key={index} className="skill">

              <div className="skill-info">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

            </div>
          ))}

        </motion.div>

        {/* BACKEND */}

        <motion.div
          className="skills-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >

          <h3>Backend</h3>

          {backendSkills.map((skill, index) => (
            <div key={index} className="skill">

              <div className="skill-info">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

            </div>
          ))}

        </motion.div>

        {/* TOOLS */}

        <motion.div
          className="skills-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >

          <h3>Tools</h3>

          {toolsSkills.map((skill, index) => (
            <div key={index} className="skill">

              <div className="skill-info">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

            </div>
          ))}

        </motion.div>

      </div>

    </section>
  );
}

export default Skills;
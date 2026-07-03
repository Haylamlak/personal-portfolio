import "./About.css";
import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaLaptopCode,
  FaBullseye,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about">

      <div className="section-title">

        <h2>About Me</h2>

        <p>Who I am and what I do</p>

      </div>

      <div className="about-container">

        {/* Left Side */}

        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <img
            src="/code.jpeg"
            alt="profile"
          />

        </motion.div>

        {/* Right Side */}

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <h3>Hello 👋</h3>

          <h1>I'm Haylamlak Ayelgn</h1>

          <p>

            I'm a Computer Science student and passionate
            Full Stack Web Developer.

            I enjoy creating responsive, modern,
            and user-friendly web applications using
            React, Node.js, Express, and MySQL.

            I'm continuously learning new technologies
            and improving my problem-solving skills.

          </p>

          <div className="about-cards">

            <div className="card">

              <FaLaptopCode />

              <h4>Experience</h4>

              <p>15+ Projects</p>

            </div>

            <div className="card">

              <FaUserGraduate />

              <h4>Education</h4>

              <p>Computer Science</p>

            </div>

            <div className="card">

              <FaBullseye />

              <h4>Goal</h4>

              <p>Full Stack Developer</p>

            </div>

          </div>

          <div className="about-buttons">

            <a
              href="/resume.pdf"
              className="about-btn primary"
              target="_blank"
            >

              <FaDownload />

              Download CV

            </a>

            <a
              href="#contact"
              className="about-btn secondary"
            >

              <FaEnvelope />

              Hire Me

            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default About;
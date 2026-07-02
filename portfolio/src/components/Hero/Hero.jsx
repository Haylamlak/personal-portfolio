import "./Hero.css";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaEnvelope,
  FaArrowDown,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="hero-greeting">👋 Hello, I'm</p>

          <h1 className="hero-name">
            Haylamlak <span>Ayelgn</span>
          </h1>

          <h2 className="hero-job">
            <Typewriter
              words={[
                "Full Stack Web Developer",
                "React Developer",
                "Node.js Developer",
                "Frontend Developer",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>

          <p className="hero-description">
            I'm a Computer Science student passionate about building
            responsive, modern, and scalable web applications using
            React, Node.js, Express, and MySQL.

            <br />
            <br />

            My goal is to become a professional Full Stack Developer
            and create software that solves real-world problems.
          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <a
              href="/resume.pdf"
              target="_blank"
              className="btn primary-btn"
            >
              Download CV
            </a>

            <a
              href="#contact"
              className="btn secondary-btn"
            >
              Contact Me
            </a>

          </div>

          {/* SOCIAL ICONS */}

          <div className="hero-social">

            <a
              href="https://github.com/Haylamlak/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noreferrer"
            >
              <FaTelegram />
            </a>

            <a href="mailto:example@gmail.com">
              <FaEnvelope />
            </a>

          </div>

          {/* STATS */}

          <div className="hero-stats">

            <div className="stat-card">
              <h3>15+</h3>
              <p>Projects</p>
            </div>

            <div className="stat-card">
              <h3>8+</h3>
              <p>Technologies</p>
            </div>

            <div className="stat-card">
              <h3>1+</h3>
              <p>Years Learning</p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="profile-circle">

            <img
             src="/profile.JPG"
              alt="Haylamlak"
            />
          </div>

          {/* Floating Tech Icons */}

          <div className="floating react">⚛️</div>
          <div className="floating js">🟨</div>
          <div className="floating node">🟢</div>
          <div className="floating sql">🛢️</div>

        </motion.div>

      </div>

      {/* Scroll Down */}

      <a href="#about" className="scroll-down">
        <FaArrowDown />
      </a>

    </section>
  );
}

export default Hero;
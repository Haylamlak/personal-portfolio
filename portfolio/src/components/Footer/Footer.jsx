import "./Footer.css";

import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LOGO / NAME */}
        <div className="footer-logo">
          <h2>Haylamlak</h2>
          <p>Full Stack Web Developer</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">

          <a href="https://github.com/Haylamlak/" target="_blank">
            <FaGithub />
          </a>

          <a href="https://www.linkedin.com/feed/" target="_blank">
            <FaLinkedin />
          </a>

          <a href="https://t.me/emalene6" target="_blank">
            <FaTelegram />
          </a>

          <a href="mailto:gebreeyesusayelgn027@gmail.com">
            <FaEnvelope />
          </a>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Haylamlak. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
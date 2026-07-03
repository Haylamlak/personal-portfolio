import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* LOGO ONLY */}
      <div className="logo">
        <img src="/favicon.png" alt="H Logo" />
      </div>

      {/* NAV LINKS */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="about" smooth={true} duration={500} onClick={closeMenu}>
            About
          </Link>
        </li>

        <li>
          <Link to="skills" smooth={true} duration={500} onClick={closeMenu}>
            Skills
          </Link>
        </li>

        <li>
          <Link to="projects" smooth={true} duration={500} onClick={closeMenu}>
            Projects
          </Link>
        </li>

        <li>
          <Link to="services" smooth={true} duration={500} onClick={closeMenu}>
            Services
          </Link>
        </li>

        <li>
          <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>
            Contact
          </Link>
        </li>

      </ul>

      {/* MOBILE ICON */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </nav>
  );
}

export default Navbar;
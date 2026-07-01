import "./Services.css";
import { motion } from "framer-motion";

import {
  FaCode,
  FaPaintBrush,
  FaDatabase,
  FaMobileAlt,
  FaServer,
  FaBug,
} from "react-icons/fa";

function Services() {
  return (
    <section className="services" id="services">

      {/* TITLE */}

      <div className="section-title">
        <h2>My Services</h2>
        <p>What I can do for you</p>
      </div>

      {/* GRID */}

      <div className="services-container">

        {/* Service 1 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaCode />
          <h3>Web Development</h3>
          <p>
            I build responsive and modern websites using React,
            HTML, CSS, and JavaScript.
          </p>
        </motion.div>

        {/* Service 2 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FaServer />
          <h3>Backend Development</h3>
          <p>
            I develop secure REST APIs using Node.js, Express,
            and MySQL databases.
          </p>
        </motion.div>

        {/* Service 3 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <FaDatabase />
          <h3>Database Design</h3>
          <p>
            I design and manage structured databases using MySQL
            for scalable applications.
          </p>
        </motion.div>

        {/* Service 4 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FaMobileAlt />
          <h3>Responsive Design</h3>
          <p>
            I create mobile-friendly websites that work on all
            devices and screen sizes.
          </p>
        </motion.div>

        {/* Service 5 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <FaPaintBrush />
          <h3>UI/UX Design</h3>
          <p>
            I design clean and modern user interfaces for better
            user experience.
          </p>
        </motion.div>

        {/* Service 6 */}

        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FaBug />
          <h3>Bug Fixing</h3>
          <p>
            I debug and fix frontend and backend issues to improve
            application performance.
          </p>
        </motion.div>

      </div>

    </section>
  );
}

export default Services;
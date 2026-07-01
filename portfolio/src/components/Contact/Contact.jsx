import "./Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    setStatus("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setStatus(data.message || "Something went wrong");
    }
  } catch (error) {
    setStatus("Server error. Try again later.");
  }
};

return (
    <section className="contact" id="contact">

      <div className="section-title">
        <h2>Contact Me</h2>
        <p>Let's work together</p>
      </div>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Send Message <FaPaperPlane />
        </button>

        {status && <p className="status">{status}</p>}

      </motion.form>

    </section>
  );
}

export default Contact;
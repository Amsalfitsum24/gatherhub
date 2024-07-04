import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Message submitted:", { name, email, message });
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="contact-form-button">
          Submit
        </button>
      </form>
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>Phone: +251961046155</p>
        <p>Email: amsalfissha21@gmail.com</p>
        <p>Address: 123 Tilut, Addis Ababa, Ethiopia</p>
        <div className="contact-social-media">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={30} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

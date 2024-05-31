import { useState } from "react";
import { useParams } from "react-router-dom";
import { rsvpEvent } from "../services/firebase";
import "../styles/auth.css";

const RSVP = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await rsvpEvent(id, { name, email, phone });
        setName("");
        setEmail("");
        setPhone("");
        setSuccess(true);
      } catch (error) {
        setError("Failed to RSVP. Please try again.");
      }
    } else {
      setError("Event ID is undefined.");
    }
  };

  return (
    <div className="auth-container">
      <h1>RSVP</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Successfully RSVP'd!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your Phone Number"
          required
        />
        <button type="submit">RSVP</button>
      </form>
    </div>
  );
};

export default RSVP;

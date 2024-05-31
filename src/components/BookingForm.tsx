import React, { useState } from "react";
import "../styles/BookingForm.css";
import { rsvpEvent } from "../services/firebase"; // Import the rsvpEvent function

const BookingForm: React.FC<{ eventId: string; onClose: () => void }> = ({
  eventId,
  onClose,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await rsvpEvent(eventId, {
        name: `${firstName} ${lastName}`,
        email,
        phone: "", // Add phone if you have a phone input
      });
      onClose();
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Book Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

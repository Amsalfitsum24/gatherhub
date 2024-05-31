import React from "react";
import { Event } from "../types/Event";
import "../styles/EventDetailsPopup.css";

const EventDetailsPopup: React.FC<{ event: Event; onClose: () => void }> = ({
  event,
  onClose,
}) => {
  return (
    <div className="details-form-overlay">
      <div className="details-form">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{event.title}</h2>
        <p>
          <strong>Posted By:</strong> {event.username}
        </p>
        <p>
          <strong>City:</strong> {event.city}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(event.date.seconds * 1000).toLocaleDateString()}
        </p>
        <p>
          <strong>Address:</strong> {event.address}
        </p>
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>
          <strong>Payment:</strong> ${event.payment}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Requirements:</strong> {event.requirements}
        </p>
        <div className="event-images">
          {event.imageUrl.map((url, index) => (
            <img key={index} src={url} alt={`Event image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPopup;

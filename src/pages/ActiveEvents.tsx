import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getEvents, deleteEvent } from "../services/firebase";
import { Event } from "../types/Event";
import "../styles/ActiveEvents.css"; // Import the CSS file for ActiveEvents

const ActiveEvents: React.FC = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState<Event[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const allEvents = await getEvents();
        const activeEvents = allEvents.filter(
          (event) =>
            event.userId === user.uid &&
            new Date(event.date.seconds * 1000) >= new Date()
        );
        setEvents(activeEvents);
      }
    };
    fetchEvents();
  }, [user]);

  const handleDelete = async (eventId: string) => {
    setEventToDelete(eventId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete);
      setEvents(events.filter((event) => event.id !== eventToDelete));
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
  };

  return (
    <div className="active-events-container">
      <h1>My Active Events</h1>
      <div className="event-listActive">
        {events.map((event) => (
          <div key={event.id} className="event-cardActive">
            <div className="event-avatarActive">
              <img src={event.imageUrl[0]} alt={event.title} />
            </div>
            <div className="event-infoActive">
              <h2>{event.title}</h2>
              <p>{new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
            </div>
            <div className="attendees-countActive">
              <p>{event.attendees.length} Attendees</p>
            </div>
            <button
              className="delete-buttonAct"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-popupAct">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default ActiveEvents;

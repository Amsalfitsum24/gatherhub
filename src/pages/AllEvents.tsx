import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getEvents } from "../services/firebase";
import { Event } from "../types/Event";

const AllEvents: React.FC = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const allEvents = await getEvents();
        const userEvents = allEvents.filter(
          (event) => event.userId === user.uid
        );
        setEvents(userEvents);
      }
    };
    fetchEvents();
  }, [user]);

  return (
    <div>
      <h1>All of my Events</h1>
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <h2>{event.title}</h2>
          <p>{new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AllEvents;

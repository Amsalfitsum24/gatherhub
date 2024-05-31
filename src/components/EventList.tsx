import React from "react";
import { Event } from "../types/Event";
import EventCard from "./EventCard";
import "../styles/EventList.css";

const EventList: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;

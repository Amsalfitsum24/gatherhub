import { useEffect, useState } from "react";
import { getEvents } from "../services/firebase";
import { Event } from "../types/Event";
import EventCard from "../components/EventCard";
import Carousel from "../components/Carousel";
import "../styles/Home.css";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsTillSunday, setEventsTillSunday] = useState<Event[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);

      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const tillSunday = eventsData.filter(
        (event) => new Date(event.date.seconds * 1000) <= nextWeek
      );

      const withAttendees = eventsData.filter(
        (event) => event.attendees && event.attendees.length > 0
      );

      setEventsTillSunday(tillSunday);
      setPopularEvents(withAttendees);
    };
    fetchEvents();
  }, []);

  return (
    <div className="home-containerhh">
      <Carousel />
      <h1>Upcoming Events</h1>
      <div className="events-sectionhh">
        <h2>This Week's Events</h2>
        <div className="event-listhh">
          {eventsTillSunday.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div className="events-sectionhh">
        <h2>Popular Events</h2>
        <div className="event-listhh">
          {popularEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <h2>All Upcoming Events</h2>
      <div className="event-listhh">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;

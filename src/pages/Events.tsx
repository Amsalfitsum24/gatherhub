import { useEffect, useState } from "react";
import { getEvents } from "../services/firebase";
import { Event } from "../types/Event";
import EventCard from "../components/EventCard";
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) => event.category === selectedCategory
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="events-container">
      <h1>All Events</h1>
      <div className="filter-container">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="event-list">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;

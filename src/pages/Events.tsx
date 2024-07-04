// import { useEffect, useState } from "react";
// import { getEvents } from "../services/firebase";
// import { Event } from "../types/Event";
// import EventCard from "../components/EventCard";
// import "../styles/Events.css";

// const Events = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
//   const [category, setCategory] = useState<string>("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const eventsData = await getEvents();
//       setEvents(eventsData);
//       setFilteredEvents(eventsData);
//     };
//     fetchEvents();
//   }, []);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);
//     if (selectedCategory === "") {
//       setFilteredEvents(events);
//     } else {
//       const filtered = events.filter(
//         (event) => event.category === selectedCategory
//       );
//       setFilteredEvents(filtered);
//     }
//   };

//   return (
//     <div className="events-container">
//       <h1>All Events</h1>
//       <div className="filter-container">
//         <label htmlFor="category-filter">Filter by Category:</label>
//         <select
//           id="category-filter"
//           value={category}
//           onChange={handleCategoryChange}
//         >
//           <option value="">All Categories</option>
//           <option value="GYM">Music</option>
//           <option value="Yoga">Art</option>
//           <option value="Hiking">Technology</option>
//           <option value="Church">Sports</option>
//           <option value="fun">Education</option>
//           <option value="Charity">Education</option>
//           <option value="Party">Education</option>
//         </select>
//       </div>
//       <div className="events-list">
//         {filteredEvents.map((event) => (
//           <EventCard key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Events;

import { useEffect, useState } from "react";
import { getEvents } from "../services/firebase";
import { Event } from "../types/Event";
import EventCard from "../components/EventCard";
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleCategoryClick = (category: string) => {
    let newSelectedCategories: string[];
    if (category === "All") {
      setSelectedCategories([]);
      setFilteredEvents(events);
      return;
    }

    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        newSelectedCategories.includes(event.category)
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="events-container">
      <h1>All Events</h1>
      <div className="filter-container">
        {[
          "All",
          "GYM",
          "Yoga",
          "Hiking",
          "Church",
          "fun",
          "Charity",
          "Party",
        ].map((category) => (
          <button
            key={category}
            className={`filter-chip ${
              selectedCategories.includes(category) ||
              (category === "All" && selectedCategories.length === 0)
                ? "active"
                : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="events-list">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;

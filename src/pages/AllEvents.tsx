// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, getEvents } from "../services/firebase";
// import { Event } from "../types/Event";
// import "../styles/AllEvents.css";

// const AllEvents: React.FC = () => {
//   const [user] = useAuthState(auth);
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (user) {
//         const allEvents = await getEvents();
//         const userEvents = allEvents.filter(
//           (event) => event.userId === user.uid
//         );
//         console.log("User events:", userEvents); // Log events filtered by user
//         setEvents(userEvents);
//       }
//     };
//     fetchEvents();
//   }, [user]);

//   return (
//     <div className="all-events-container">
//       <h1>All of my Events</h1>
//       <div className="event-listAll">
//         {events.map((event) => (
//           <div key={event.id} className="event-cardAll">
//             <div className="event-avatarAll">
//               <img src={event.imageUrl[0]} alt={event.title} />
//             </div>

//             <div className="event-infoAll">
//               <h2>{event.title}</h2>
//               <p>{new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
//             </div>
//             <div className="attendees-countAll">
//               <p>{event.attendees.length} Attendees</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllEvents;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getEvents, deleteEvent } from "../services/firebase";
import { Event } from "../types/Event";
import "../styles/AllEvents.css";

const AllEvents: React.FC = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState<Event[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

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
    <div className="all-events-container">
      <h1>All of my Events</h1>
      <div className="event-listAll">
        {events.map((event) => (
          <div key={event.id} className="event-cardAll">
            <div className="event-avatarAll">
              <img src={event.imageUrl[0]} alt={event.title} />
            </div>
            <div className="event-infoAll">
              <h2>{event.title}</h2>
              <p>{new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
            </div>
            <div className="attendees-countAll">
              <p>{event.attendees.length} Attendees</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-popup">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default AllEvents;

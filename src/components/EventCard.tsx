// import React, { useState } from "react";
// import { Event } from "../types/Event";
// import BookingForm from "./BookingForm";
// import EventDetailsPopup from "./EventDetailsPopup";
// import "../styles/EventCard.css";

// const EventCard: React.FC<{ event: Event }> = ({ event }) => {
//   const [isBooking, setIsBooking] = useState(false);
//   const [isDetails, setIsDetails] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === event.imageUrl.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? event.imageUrl.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="event-card-container">
//       <div
//         className="event-card"
//         style={{ backgroundImage: `url(${event.imageUrl[currentImageIndex]})` }}
//       >
//         <div className="event-header">
//           <span className="event-username">@{event.username}</span>
//           <span className="event-city">
//             <i className="fas fa-map-marker-alt"></i> {event.city}
//           </span>
//         </div>
//         <div className="carousel-buttons">
//           <button onClick={prevImage}>&lt;</button>
//           <button onClick={nextImage}>&gt;</button>
//         </div>
//         <div className="event-card-content">
//           <h3 className="event-title">{event.title}</h3>
//           <p className="event-description">{event.description}</p>
//           <div className="event-buttons">
//             <button onClick={() => setIsBooking(true)}>Book</button>
//             <button onClick={() => setIsDetails(true)}>Details</button>
//           </div>
//         </div>
//       </div>
//       {isBooking && (
//         <div className="popup-overlay">
//           <BookingForm eventId={event.id} onClose={() => setIsBooking(false)} />
//         </div>
//       )}
//       {isDetails && (
//         <div className="popup-overlay">
//           <EventDetailsPopup
//             event={event}
//             onClose={() => setIsDetails(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCard;
import React, { useState } from "react";
import { Event } from "../types/Event";
import BookingForm from "./BookingForm";
import EventDetailsPopup from "./EventDetailsPopup";
import "../styles/EventCard.css";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === event.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? event.imageUrl.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="event-card-container">
      <div
        className="event-cardH"
        style={{ backgroundImage: `url(${event.imageUrl[currentImageIndex]})` }}
      >
        <div className="event-header">
          <span className="event-username">@{event.username}</span>
          <span className="event-city">
            <i className="fas fa-map-marker-alt"></i> {event.city}
          </span>
        </div>
        <div className="carousel-buttons">
          <button onClick={prevImage}>&lt;</button>
          <button onClick={nextImage}>&gt;</button>
        </div>
        <div className="event-card-content">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          <div className="event-buttons">
            <button onClick={() => setIsBooking(true)}>Book</button>
            <button onClick={() => setIsDetails(true)}>Details</button>
          </div>
        </div>
      </div>
      {isBooking && (
        <div className="popup-overlay">
          <BookingForm eventId={event.id} onClose={() => setIsBooking(false)} />
        </div>
      )}
      {isDetails && (
        <div className="popup-overlay">
          <EventDetailsPopup
            event={event}
            onClose={() => setIsDetails(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard;

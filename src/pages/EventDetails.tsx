import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/firebase";
import { Event } from "../types/Event";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const eventData = await getEventById(id);
          setEvent(eventData);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch event data.");
          setLoading(false);
        }
      }
    };
    fetchEvent();
  }, [id]);

  const formatDate = (date: { seconds: number; nanoseconds: number }) => {
    const jsDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    return jsDate.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{formatDate(event.date)}</p>
      <p>{event.city}</p>
      <p>{event.address}</p>
      <p>{event.category}</p>
      <p>{event.payment}</p>
      <div>
        {event.imageUrl.map((url, index) => (
          <img key={index} src={url} alt={`Event image ${index + 1}`} />
        ))}
      </div>
      <p>{event.requirements}</p>
      <h2>Attendees</h2>
      <ul>
        {event.attendees.map((attendee, index) => (
          <li key={index}>
            {attendee.name} - {attendee.email} - {attendee.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;

import { useState } from "react";
import { createEvent } from "../services/firebase";
import { Event } from "../types/Event";
import { Timestamp, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../services/firebase"; // Make sure db is imported here
import "../styles/CreateEvent.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState(0);
  const [requirements, setRequirements] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    // Fetch the username of the current user
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.exists() ? userDoc.data().username : "Unknown";

    const newEvent: Omit<Event, "id"> = {
      title,
      description,
      date: Timestamp.fromDate(new Date(date)), // Convert the date string to a Firestore Timestamp
      city,
      address,
      category,
      payment,
      imageUrl: [], // This will be populated after image upload
      requirements,
      attendees: [],
      userId: user.uid,
      username, // Add the username field
    };
    await createEvent(newEvent, images);
    setTitle("");
    setDescription("");
    setDate("");
    setCity("");
    setAddress("");
    setCategory("");
    setPayment(0);
    setRequirements("");
    setImages([]);
  };

  return (
    <div className="create-event-container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Payment</label>
          <input
            id="payment"
            type="number"
            value={payment}
            onChange={(e) => setPayment(Number(e.target.value))}
            placeholder="Payment"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Event Images</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements/Instructions</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Requirements/Instructions"
            required
          ></textarea>
        </div>
        <button type="submit" className="create-event-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

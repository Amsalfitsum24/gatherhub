import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD87cHnsUyT5M7xcVmrwc9TNwFr1O4KZAQ",
  authDomain: "gatherhub-458aa.firebaseapp.com",
  projectId: "gatherhub-458aa",
  storageBucket: "gatherhub-458aa.appspot.com",
  messagingSenderId: "1036140535085",
  appId: "1:1036140535085:web:3c74b40e89c7a919e207a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const populateFirestore = async () => {
  const eventsCol = collection(db, "events");

  const events = [
    {
      title: "Event 1",
      description: "Description for Event 1",
      date: "2024-06-15",
      city: "City 1",
      address: "Address 1",
      category: "Category 1",
      payment: 0,
      imageUrl: "https://example.com/image1.jpg",
      requirements: "Requirements for Event 1",
      attendees: [],
      userId: "placeholder-user-id",
    },
    {
      title: "Event 2",
      description: "Description for Event 2",
      date: "2024-07-20",
      city: "City 2",
      address: "Address 2",
      category: "Category 2",
      payment: 10,
      imageUrl: "https://example.com/image2.jpg",
      requirements: "Requirements for Event 2",
      attendees: [],
      userId: "placeholder-user-id",
    },
  ];

  for (const event of events) {
    await addDoc(eventsCol, event);
  }

  console.log("Firestore populated with initial data.");
};

populateFirestore().catch(console.error);

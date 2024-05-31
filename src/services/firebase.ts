import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Event } from "../types/Event";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db };

// Authentication functions
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if the user already exists in Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    // If not, store user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      createdAt: new Date(),
    });
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Error during signInWithEmail:", error);
    throw error;
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    console.log("Checking if username exists");
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      throw new Error("Username already taken");
    }
    console.log("Creating user");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Updating profile with username");
    await updateProfile(user, { displayName: username });

    console.log("Storing user information in Firestore");
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date(),
    });
    console.log("User sign-up process completed");
  } catch (error: any) {
    console.error("Error during signUpWithEmail:", error.message, error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error during signOutUser:", error);
    throw error;
  }
};

// Check if username exists
export const checkUsernameExists = async (
  username: string
): Promise<boolean> => {
  try {
    console.log("Checking Firestore for username:", username);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot empty:", querySnapshot.empty);
    return !querySnapshot.empty;
  } catch (error: any) {
    console.error("Error checking username existence:", error.message, error);
    throw error;
  }
};

// Firestore functions
export const getEvents = async (): Promise<Event[]> => {
  const eventsCol = collection(db, "events");
  const q = query(eventsCol, orderBy("date", "asc"));
  const eventSnapshot = await getDocs(q);
  return eventSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Event)
  );
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const eventDoc = await getDoc(doc(db, "events", id));
  return eventDoc.exists()
    ? ({ id: eventDoc.id, ...eventDoc.data() } as Event)
    : null;
};

export const createEvent = async (
  event: Omit<Event, "id" | "username">,
  images: File[]
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) throw new Error("User document not found");

  const userData = userDoc.data();
  const username = userData?.username;

  const eventRef = await addDoc(collection(db, "events"), {
    ...event,
    attendees: [],
    userId: user.uid,
    username, // Add username here
  });

  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const storageRef = ref(storage, `events/${eventRef.id}/${image.name}`);
      await uploadBytes(storageRef, image);
      return await getDownloadURL(storageRef);
    })
  );

  await setDoc(eventRef, {
    ...event,
    imageUrl: imageUrls,
    attendees: [],
    userId: user.uid,
    username, // Add username here
  });
};

export const getCarouselImages = async (): Promise<
  { url: string; description: string }[]
> => {
  const imagesCol = collection(db, "carouselImages");
  const imageSnapshot = await getDocs(imagesCol);
  return imageSnapshot.docs.map(
    (doc) => doc.data() as { url: string; description: string }
  );
};

export const rsvpEvent = async (
  eventId: string,
  attendee: { name: string; email: string; phone: string }
): Promise<void> => {
  const eventDocRef = doc(db, "events", eventId);
  const eventDoc = await getDoc(eventDocRef);
  if (eventDoc.exists()) {
    const eventData = eventDoc.data() as Event;
    eventData.attendees.push(attendee);
    await setDoc(eventDocRef, eventData, { merge: true });
  }
};

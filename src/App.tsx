import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";
import RSVP from "./pages/RSVP";
import MyEvents from "./pages/MyEvents";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import "./App.css";
import "./styles/styles.css";
import "./styles/Navbar.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="contentpp" color="red">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/rsvp/:id" element={<RSVP />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

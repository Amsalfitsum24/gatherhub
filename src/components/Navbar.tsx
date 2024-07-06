import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
  };

  const handleMyEventsClick = () => {
    if (!user) {
      navigate("/sign-in");
      window.alert("You need to sign in to access this page.");
    } else {
      navigate("/myevents");
    }
  };

  return (
    <nav>
      <h1>GatherHub</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <button onClick={handleMyEventsClick} className="nav-button">
            MyEvents
          </button>
        </li>
        {user ? (
          <li>
            <button onClick={handleSignOut} className="nav-button">
              Sign Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

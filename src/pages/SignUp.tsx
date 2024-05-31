import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail, checkUsernameExists } from "../services/firebase";
import "../styles/auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Checking if username exists");
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setError("Username is already taken. Please choose another one.");
        return;
      }
      console.log("Signing up with email");
      await signUpWithEmail(email, password, username);
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("Failed to sign up. Please check your details and try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleEmailSignUp}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="signin-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

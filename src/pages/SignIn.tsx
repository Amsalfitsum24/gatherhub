import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail } from "../services/firebase";
import "../styles/auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Error during email sign-in:", error);
      setError(
        error.message ||
          "Failed to sign in. Please check your credentials and try again."
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      setError(error.message || "Failed to sign in with Google.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Sign In</h1>
        {error && <p className="error">{error}</p>}
        <button onClick={handleGoogleSignIn} className="google-signin">
          Sign In with Google
        </button>
        <form onSubmit={handleEmailSignIn}>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

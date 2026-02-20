import { useState } from "react";
import { signupAPI } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupAPI({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Signup failed. Try a different email.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account 🚀</h2>
        <p className="auth-subtitle">
          Sign up to start chatting with AI
        </p>

        <form onSubmit={submit} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

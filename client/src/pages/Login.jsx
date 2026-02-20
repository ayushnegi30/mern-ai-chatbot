import { useState } from "react";
import { loginAPI } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">
          Login to continue chatting with AI
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

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

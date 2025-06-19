import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
    navigate("/welcome");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#1a1a1a] p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded bg-[#2a2a2a] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 rounded bg-[#2a2a2a] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-700 hover:bg-purple-600 rounded text-white font-semibold"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

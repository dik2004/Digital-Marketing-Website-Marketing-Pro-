import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api.js";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, form, {
        headers: { "Content-Type": "application/json" },
      });

      // Optionally store token in localStorage for later use
      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user info
      }

      // Redirect logic based on role
      const userType = response.data.user.userType;
      const isAdmin = response.data.user.role === 'admin';

      if (userType === 'provider') {
        navigate("/provider/dashboard");
      } else {
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
          backgroundImage: 'linear-gradient(45deg, #667eea 25%, transparent 25%), linear-gradient(-45deg, #667eea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #667eea 75%), linear-gradient(-45deg, transparent 75%, #667eea 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>

      {/* 3D Orbs Background */}
      <div className="orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
      </div>

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden grid md:grid-cols-2 relative z-10">
      
        {/* Left info */}
        <div className="hidden md:flex bg-linear-to-br from-blue-800 via-oceanblue-600 to-teal-500 text-white p-10 flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-4">Welcome back</h1>
            <p className="text-blue-100 mb-6">
              Log in with the account you registered or use the demo credentials:
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• admin@marketingpro.com / admin123 (admin)</li>
              <li>• user@marketingpro.com / user123 (demo user)</li>
            </ul>
          </div>
          <p className="text-xs text-blue-100/80">
            New here? Register as a client or provider to be stored in MongoDB and tracked as a
            candidate.
          </p>
        </div>

        {/* Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Don&apos;t have an account yet?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

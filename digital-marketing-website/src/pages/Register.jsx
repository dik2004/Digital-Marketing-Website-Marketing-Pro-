import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "client", // client = wants to take services, provider = wants to give services
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, form, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess("Registration successful. You can now log in.");
        setForm({
          name: "",
          email: "",
          password: "",
          userType: "client",
        });

        // Optional: redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again.";
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

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative z-10">
        {/* Left side info */}
        <div className="bg-linear-to-br from-blue-800 via-oceanblue-600 to-teal-500 text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Create your account</h1>
            <p className="text-blue-100 mb-6">
              Tell us whether you want to <span className="font-semibold">take services</span> as a
              client or <span className="font-semibold">offer services</span> as a provider. This
              helps us route the right opportunities to you.
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Clients: get matched with the right marketing experts.</li>
              <li>• Providers: showcase your skills and receive qualified leads.</li>
            </ul>
          </div>
          <p className="text-xs text-blue-100/80 mt-8">
            You can see all registered users and counts directly in MongoDB under the{" "}
            <span className="font-semibold">users</span> collection.
          </p>
        </div>

        {/* Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Register</h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-400 text-green-800 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Enter your full name"
              />
            </div>

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
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Minimum 6 characters"
              />
            </div>

            <div>
              <span className="block text-sm font-semibold text-gray-800 mb-2">
                I am registering as
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, userType: "client" }))}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.userType === "client"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-blue-300"
                    }`}
                >
                  Client (take services)
                </button>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, userType: "provider" }))}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.userType === "provider"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 text-gray-700 hover:border-purple-300"
                    }`}
                >
                  Provider (give services)
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

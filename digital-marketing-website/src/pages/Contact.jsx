import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [lastSubmission, setLastSubmission] = useState(null); // store last successfully sent message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setLastSubmission(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/leads`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        // Prefer the data returned by API, fall back to the form we just sent
        setLastSubmission(response.data || form);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      // Extract error message from response
      let errorMessage = "Failed to submit. Please try again or contact us directly.";

      if (err.response) {
        // Server responded with error status
        const errorData = err.response.data;
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "Unable to connect to server. Please check if the backend is running and accessible at " + API_BASE_URL;
      } else {
        // Something else happened
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      content: "dilipdiksha2004@gmail.com",
      subContent: "support@marketingpro.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "📞",
      title: "Phone",
      content: "+91 9998887776",
      subContent: "Mon-Fri 9AM-6PM EST",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "📍",
      title: "Address",
      content: "Phagwara, Punjab",
      subContent: "Business City, BC 12345",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`bg-linear-to-br ${info.color} p-8 rounded-2xl text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="text-5xl mb-4">{info.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{info.title}</h3>
                <p className="text-lg mb-1">{info.content}</p>
                <p className="text-blue-100 text-sm">{info.subContent}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {success && (
                <div className="mb-6 bg-green-50 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold">Thank you! Your message has been sent successfully.</p>
                    <p className="text-sm">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {lastSubmission && (
                <div className="mb-6 bg-white border-2 border-blue-200 text-gray-900 px-6 py-4 rounded-xl shadow-sm">
                  <p className="font-bold mb-2">Your submitted details:</p>
                  <ul className="text-sm space-y-1">
                    <li><span className="font-semibold">Name:</span> {lastSubmission.name}</li>
                    <li><span className="font-semibold">Email:</span> {lastSubmission.email}</li>
                    {lastSubmission.phone && (
                      <li><span className="font-semibold">Phone:</span> {lastSubmission.phone}</li>
                    )}
                    {lastSubmission.message && (
                      <li>
                        <span className="font-semibold">Message:</span>{" "}
                        <span className="whitespace-pre-line wrap-break-word">
                          {lastSubmission.message}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-800 font-bold mb-2 text-lg">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-800 font-bold mb-2 text-lg">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-800 font-bold mb-2 text-lg">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                    placeholder="Enter your valid phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-800 font-bold mb-2 text-lg">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg resize-none"
                    placeholder="Tell us about your project, goals, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Business Hours</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center justify-between pb-4 border-b border-white/20">
                    <span className="font-semibold">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex items-center justify-between pb-4 border-b border-white/20">
                    <span className="font-semibold">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold">Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Free Consultation</h4>
                      <p className="text-gray-600">Get expert advice on your marketing strategy</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Custom Solutions</h4>
                      <p className="text-gray-600">Tailored packages for your business needs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Quick Response</h4>
                      <p className="text-gray-600">We respond within 24 hours guaranteed</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl p-10 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <p className="text-purple-100 mb-6">Stay connected on social media</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our Facebook page"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 transform"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our Twitter profile"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 transform"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit our LinkedIn profile"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 transform"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="mailto:dilipdiksha2004@gmail.com"
                    aria-label="Send us an email"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 transform"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

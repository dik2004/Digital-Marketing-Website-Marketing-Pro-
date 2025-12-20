import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api.js";

const getServiceIdFromTitle = (title) =>
  title
    ?.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Fallback services shown when the API is empty or unavailable
import { services as DEFAULT_SERVICES } from "../data/services";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    // Delay slightly to ensure DOM is rendered
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.hash, services]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/services`);
      const data = Array.isArray(response.data) ? response.data : [];

      // If API returns no services, fall back to our defaults
      if (!data.length) {
        setServices(DEFAULT_SERVICES);
      } else {
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Fallback to default services if API fails
      setServices(DEFAULT_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl text-gray-600 font-semibold">Loading services...</div>
        </div>
      </div>
    );
  }

  const gradientColors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-green-500 to-green-600",
    "from-orange-500 to-orange-600",
    "from-indigo-500 to-indigo-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our <span className="text-yellow-300">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital marketing solutions designed to grow your business and maximize your ROI
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={service._id}
                id={getServiceIdFromTitle(service.title)}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${gradientColors[index % gradientColors.length]} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-6xl">{service.icon || "🚀"}</div>
                    <div className="text-right">
                      <div className="text-4xl font-extrabold">₹{service.price?.toLocaleString()}</div>
                      <div className="text-blue-100 text-sm">per month</div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{service.title}</h3>
                  <p className="text-blue-100 text-lg leading-relaxed">{service.description}</p>
                </div>

                {/* Features Section */}
                <div className="p-8">
                  {service.features && service.features.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        What's Included:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                          >
                            <span className="text-green-500 text-xl font-bold mt-0.5 flex-shrink-0">✓</span>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <Link
                      to={`/services/${service._id}`}
                      className={`block w-full bg-gradient-to-r ${gradientColors[index % gradientColors.length]} text-white text-center px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Get Started Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Solution CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-12 text-white text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                We understand every business is unique. Let us create a tailored marketing package that perfectly fits your specific needs, goals, and budget.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
              >
                Contact Us for Custom Quote
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Satisfaction</h3>
              <p className="text-gray-600">Money-back guarantee if you're not satisfied</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Setup</h3>
              <p className="text-gray-600">Get started in 24-48 hours</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated support team always available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

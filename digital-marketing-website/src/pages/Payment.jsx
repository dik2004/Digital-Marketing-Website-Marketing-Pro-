import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(services.find((s) => s._id === id) || null);
    const [loading, setLoading] = useState(!service); // If not found initially, we are loading (fetching)
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    useEffect(() => {
        const fetchService = async () => {
            if (service) {
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/services/${id}`);
                if (response.data) {
                    setService(response.data);
                } else {
                    // If API also returns nothing/error handled by catch, redirect
                    navigate("/services");
                }
            } catch (error) {
                console.error("Error fetching service for payment:", error);
                // Redirect if service really doesn't exist
                navigate("/services");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Simple formatting for visual polish
        if (name === "cardNumber") {
            formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
        } else if (name === "expiry") {
            formattedValue = value.replace(/\D/g, '').substring(0, 4).replace(/(.{2})/, '$1/').trim();
        } else if (name === "cvv") {
            formattedValue = value.replace(/\D/g, '').substring(0, 3);
        }

        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-pulse">
                    <div className="text-2xl font-bold text-gray-800">Start Payment...</div>
                </div>
            </div>
        );
    }

    if (!service) return null;

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50 px-6">
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full animate-bounce-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl">🎉</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-8">
                        Your order for <span className="font-bold text-gray-800">{service.title}</span> has been confirmed. Our team will contact you shortly.
                    </p>
                    <Link to="/" className="block w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* Left Side: Order Summary */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <div className="flex items-center gap-4 mb-8 bg-blue-50 p-4 rounded-xl">
                        <div className="text-4xl">{service.icon}</div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                            <p className="text-sm text-gray-500">Monthly Subscription</p>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-6 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{service.price?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax (18% GST)</span>
                            <span>₹{Math.round(service.price * 0.18).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between text-2xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>₹{Math.round(service.price * 1.18).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm flex gap-3">
                        <span className="text-xl">🔒</span>
                        <p>Secure SSL Encryption. Your annual plan renews automatically. Cancel anytime.</p>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="col-span-2 relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                                <input
                                    required
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-mono"
                                    placeholder="0000 0000 0000 0000"
                                />
                                <span className="absolute left-4 top-[42px] text-gray-400">💳</span>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    required
                                    type="text"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-mono text-center"
                                    placeholder="MM/YY"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                                <input
                                    required
                                    type="password"
                                    name="cvv"
                                    maxLength="3"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-mono text-center"
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </div>
                            ) : (
                                `Pay ₹${Math.round(service.price * 1.18).toLocaleString()}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;

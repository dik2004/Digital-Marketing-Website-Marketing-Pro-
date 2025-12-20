import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(services.find((s) => s._id === id) || null);
    const [loading, setLoading] = useState(!service);
    const [activeTab, setActiveTab] = useState("overview");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            if (service) {
                setIsVisible(true);
                return;
            }

            try {
                // Try fetching from API if not found statically
                const response = await axios.get(`${API_BASE_URL}/api/services/${id}`);
                if (response.data) {
                    setService(response.data);
                }
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
                setIsVisible(true);
            }
        };

        fetchService();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-pulse">
                    <div className="text-2xl font-bold text-gray-800">Loading details...</div>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">Service Not Found</div>
                    <Link to="/services" className="text-blue-600 hover:underline mt-4 block">Back to Services</Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "process", label: "Our Process" },
        { id: "faq", label: "FAQ" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>
                </div>

                <div className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <Link
                        to="/services"
                        className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase"
                    >
                        <span className="mr-2">←</span> Back to Services
                    </Link>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="text-6xl mb-6 animate-bounce-slow inline-block">{service.icon}</div>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                {service.title}
                            </h1>
                            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl min-w-[300px] text-center transform hover:scale-105 transition-transform duration-300">
                            <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Starting at</p>
                            <div className="text-5xl font-extrabold text-white mb-1">₹{service.price?.toLocaleString()}</div>
                            <p className="text-blue-200 text-sm mb-6">per month</p>
                            <p className="text-xs text-blue-300 mb-6 px-4">Includes dedicated account manager and monthly reporting</p>
                            <button
                                onClick={() => navigate(`/payment/${service._id}`)}
                                className="w-full bg-yellow-400 text-blue-900 font-extrabold py-4 px-8 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center gap-2 group"
                            >
                                Start Project
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex overflow-x-auto space-x-8 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-2 font-bold text-sm tracking-wide uppercase transition-colors relative whitespace-nowrap ${activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {activeTab === "overview" && (
                    <div className="space-y-16 animate-fadeIn">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Service</h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                                {service.longDescription}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Benefits</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {service.benefits?.map((benefit, index) => (
                                    <div key={index} className="flex gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-md transition-shadow">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {service.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <span className="text-green-500 text-xl">✓</span>
                                        <span className="font-medium text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "process" && (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How We Work</h2>
                        <div className="space-y-12">
                            {service.process?.map((step, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        {step.step}
                                    </div>
                                    <div className="flex-1 text-center md:text-left p-8 rounded-3xl bg-gray-50 group-hover:bg-white group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-blue-100">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "faq" && (
                    <div className="animate-fadeIn max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Common Questions</h2>
                        <div className="space-y-6">
                            {service.faqs?.map((faq, index) => (
                                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bottom CTA for Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    onClick={() => navigate(`/payment/${service._id}`)}
                    className="w-full bg-yellow-400 text-blue-900 font-extrabold py-3 rounded-xl shadow-lg"
                >
                    Proceed to Payment (₹{service.price?.toLocaleString()})
                </button>
            </div>
        </div>
    );
};

export default ServiceDetails;

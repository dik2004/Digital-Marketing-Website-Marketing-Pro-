import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

const ProviderDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newService, setNewService] = useState({
        title: "",
        description: "",
        price: "",
        icon: "🚀", // Default icon
    });

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
            return;
        }

        // Decode token simple check (in real app use a context or proper decode)
        // For now we just fetch services assuming token is valid
        fetchServices();

        // Mock user info from localStorage if available (Login.jsx should save it)
        // Or just decode token
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));

    }, [navigate]);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/services`);
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            await axios.post(
                `${API_BASE_URL}/api/services`,
                { ...newService, price: Number(newService.price), features: ["Standard Feature 1", "Standard Feature 2"] }, // simplified for demo
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            fetchServices(); // Refresh list
            setNewService({ title: "", description: "", price: "", icon: "🚀" });
        } catch (error) {
            alert("Failed to create service: " + (error.response?.data?.error || error.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-blue-800">
                    Provider<span className="text-yellow-400">Hub</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 bg-blue-800 text-white">
                        My Services
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white">
                        Orders (Coming Soon)
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white">
                        Analytics (Coming Soon)
                    </a>
                </nav>
                <div className="p-4 border-t border-blue-800">
                    <button onClick={handleLogout} className="w-full text-left py-2 px-4 hover:bg-blue-800 rounded">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Services</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-transform hover:-translate-y-1"
                    >
                        + Add New Service
                    </button>
                </header>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">₹{service.price?.toLocaleString()}</span>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Service Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
                            <form onSubmit={handleCreateService} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Title</label>
                                    <input
                                        required
                                        value={newService.title}
                                        onChange={e => setNewService({ ...newService, title: e.target.value })}
                                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. SEO Audit"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Icon (Emoji)</label>
                                    <input
                                        value={newService.icon}
                                        onChange={e => setNewService({ ...newService, icon: e.target.value })}
                                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="🚀"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">One-Liner Description</label>
                                    <input
                                        required
                                        value={newService.description}
                                        onChange={e => setNewService({ ...newService, description: e.target.value })}
                                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: e.target.value })}
                                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
                                    >
                                        Create Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProviderDashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

// Fallback blogs shown when the API is empty or unavailable
const DEFAULT_BLOGS = [
  {
    _id: "1",
    title: "10 SEO Tips to Boost Your Website Traffic in 2024",
    content:
      "Learn the latest SEO strategies that can help increase your organic traffic by up to 300%. Discover proven techniques that top marketers use to dominate search rankings and drive qualified leads to your website.",
    excerpt:
      "Discover proven SEO techniques that top marketers use to dominate search rankings and increase organic traffic significantly.",
    author: "Sarah Johnson",
    category: "SEO",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://i.pinimg.com/736x/af/3d/64/af3d64c9aebce5553dfa310308fc2f8a.jpg",
  },
  {
    _id: "2",
    title: "Social Media Marketing Trends for 2024: What You Need to Know",
    content:
      "Stay ahead of the curve with these emerging social media trends that are shaping digital marketing. From AI-powered content to video-first strategies, learn what's working now.",
    excerpt:
      "Explore the latest trends in social media marketing and how to leverage them for your brand's success in the digital landscape.",
    author: "Michael Chen",
    category: "Social Media",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
  },
  {
    _id: "3",
    title: "How to Create Content That Converts: A Complete Guide",
    content:
      "Content marketing is more than just writing blog posts. Learn how to create content that drives action, builds trust, and converts visitors into loyal customers.",
    excerpt:
      "Master the art of creating compelling content that turns visitors into customers and builds lasting relationships with your audience.",
    author: "Emily Rodriguez",
    category: "Content Marketing",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
  {
    _id: "4",
    title: "PPC Advertising: Maximizing ROI on a Limited Budget",
    content:
      "Learn how to get the most out of your PPC campaigns without breaking the bank. Discover budget optimization strategies and bidding techniques.",
    excerpt:
      "Effective PPC strategies that help you maximize return on investment even with a limited advertising budget.",
    author: "David Kim",
    category: "PPC",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    _id: "5",
    title:
      "Email Marketing Best Practices: From Open Rates to Conversions",
    content:
      "Discover the secrets to crafting email campaigns that get opened, read, and clicked. Learn segmentation, personalization, and automation strategies.",
    excerpt:
      "Transform your email marketing with proven strategies that boost open rates, engagement, and conversions.",
    author: "Lisa Anderson",
    category: "Email Marketing",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624",
  },
  {
    _id: "6",
    title: "Analytics and Data: Making Sense of Your Marketing Metrics",
    content:
      "Understanding your marketing data is crucial for success. Learn which metrics matter most and how to use analytics to make informed decisions.",
    excerpt:
      "Navigate the world of marketing analytics and learn which metrics truly matter for your business growth.",
    author: "James Wilson",
    category: "Analytics",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscription state
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setSubscribeMessage(null);

    try {
      await axios.post(`${API_BASE_URL}/api/subscribers`, { email });
      setSubscribeMessage({ type: "success", text: "🎉 Thank you for subscribing! Check your inbox soon." });
      setEmail("");
    } catch (error) {
      setSubscribeMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong. Please try again."
      });
    } finally {
      setSubscribing(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs`);
      const data = Array.isArray(response.data) ? response.data : [];

      // If API returns no blogs, fall back to our defaults
      if (!data.length) {
        setBlogs(DEFAULT_BLOGS);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs(DEFAULT_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      SEO: "bg-blue-100 text-blue-700 border-blue-200",
      "Social Media": "bg-purple-100 text-purple-700 border-purple-200",
      "Content Marketing": "bg-pink-100 text-pink-700 border-pink-200",
      PPC: "bg-green-100 text-green-700 border-green-200",
      "Email Marketing": "bg-orange-100 text-orange-700 border-orange-200",
      Analytics: "bg-indigo-100 text-indigo-700 border-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl text-gray-600 font-semibold">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Latest Marketing <span className="text-yellow-300">Articles</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and strategies in digital marketing
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-2xl text-gray-600 font-semibold">No blog posts available yet.</p>
              <p className="text-lg text-gray-500 mt-2">Check back soon for exciting content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-white/50">
                        📰
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getCategoryColor(
                          blog.category
                        )}`}
                      >
                        {blog.category || "Marketing"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span>👤</span>
                        {blog.author || "Admin"}
                      </span>
                      <span>•</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.content?.substring(0, 150) + "..."}
                    </p>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="w-full inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter Section */}
          <div className="mt-20">
            <div className="bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-12 text-white text-center shadow-2xl">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📧</div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-xl mb-8 text-purple-100 leading-relaxed">
                  Get the latest marketing insights, tips, and strategies delivered directly to your inbox. Join thousands of marketers who stay ahead of the curve.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg font-medium"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {subscribing ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>

                {subscribeMessage && (
                  <div className={`mt-6 p-4 rounded-xl ${subscribeMessage.type === 'success' ? 'bg-green-500/20 text-green-100 border border-green-500/30' : 'bg-red-500/20 text-red-100 border border-red-500/30'}`}>
                    {subscribeMessage.text}
                  </div>
                )}

                <p className="text-sm text-purple-200 mt-4">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api.js";

// Same fallback blogs used on the listing page so IDs match
const DEFAULT_BLOGS = [
  {
    _id: "1",
    title: "10 SEO Tips to Boost Your Website Traffic in 2024",
    content:
      "Learn the latest SEO strategies that can help increase your organic traffic by up to 300%. Discover proven techniques that top marketers use to dominate search rankings and drive qualified leads to your website.\n\nFrom technical SEO foundations to on-page optimisation and link-building, this guide walks you through the exact steps you can apply on your own website.",
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
      "Stay ahead of the curve with these emerging social media trends that are shaping digital marketing. From AI-powered content to video-first strategies, learn what's working now.\n\nYou will see examples of campaigns, content formats and posting schedules that brands use to build reach and engagement.",
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
      "Content marketing is more than just writing blog posts. Learn how to create content that drives action, builds trust, and converts visitors into loyal customers.\n\nWe cover hooks, structure, CTAs and distribution so every piece of content has a clear job in your funnel.",
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
      "Learn how to get the most out of your PPC campaigns without breaking the bank. Discover budget optimisation strategies and bidding techniques.\n\nThis article shows you how to structure campaigns, pick keywords and write ad copy that attracts the right clicks.",
    excerpt:
      "Effective PPC strategies that help you maximize return on investment even with a limited advertising budget.",
    author: "David Kim",
    category: "PPC",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    _id: "5",
    title: "Email Marketing Best Practices: From Open Rates to Conversions",
    content:
      "Discover the secrets to crafting email campaigns that get opened, read, and clicked. Learn segmentation, personalization, and automation strategies.\n\nYou will also see subject line formulas, template examples and sequences you can reuse.",
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
      "Understanding your marketing data is crucial for success. Learn which metrics matter most and how to use analytics to make informed decisions.\n\nWe break down dashboards, reports and simple frameworks for turning numbers into action.",
    excerpt:
      "Navigate the world of marketing analytics and learn which metrics truly matter for your business growth.",
    author: "James Wilson",
    category: "Analytics",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError("");

        // Try API first
        const response = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
        if (response.data) {
          setPost(response.data);
          return;
        }
      } catch (err) {
        // Ignore here, we will try fallback data next
      }

      // Fallback: look up in local default list
      const fallback = DEFAULT_BLOGS.find((b) => String(b._id) === String(id));
      if (fallback) {
        setPost(fallback);
      } else {
        setError("We couldn't find this article.");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading && !post && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl text-gray-600 font-semibold">
            Loading article...
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Article not found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {error ||
                "The article you are looking for does not exist or may have been removed."}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              ← Back to all articles
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 flex items-center gap-3 text-sm text-blue-100">
            <Link to="/blog" className="hover:text-yellow-300 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="opacity-80 line-clamp-1">{post.title}</span>
          </div>
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-white/15 backdrop-blur border border-white/30 mb-4">
            {post.category || "Marketing"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm">
            <span>👤 {post.author || "Admin"}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {post.imageUrl && (
              <div className="h-72 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Key details
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold">Category:</span>{" "}
                  {post.category || "Marketing"}
                </li>
                <li>
                  <span className="font-semibold">Author:</span>{" "}
                  {post.author || "Admin"}
                </li>
                <li>
                  <span className="font-semibold">Published:</span>{" "}
                  {formatDate(post.createdAt)}
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">
                Want help implementing this?
              </h3>
              <p className="text-sm text-purple-100 mb-4">
                Our team can turn this strategy into a concrete plan for your
                brand.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-5 py-2 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
              >
                Talk to our team →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;



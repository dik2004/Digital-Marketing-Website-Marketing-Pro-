import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Enhanced Visuals */}
      {/* Hero Section with Moving Gradient Theme */}
      <section className="relative text-white py-20 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="gradient-bg"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 w-full flex flex-col items-center text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-gray-900 cursor-default">
              <span className="bg-linear-to-r from-[#005c97] to-[#00cdac] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">🚀</span>
              <span className="bg-linear-to-r from-[#005c97] to-[#00cdac] bg-clip-text text-transparent">
                Transform Your Digital Presence Today
              </span>
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight text-white max-w-6xl mx-auto">
            <span className="block mb-2">Grow Your Business</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientShift_3s_ease_infinite]">
              With Smart Digital Marketing
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            We help brands increase traffic, engagement, and conversions through
            <span className="font-semibold text-white"> data-driven strategies</span> and innovative marketing solutions
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/services"
              className="bg-white text-[#005c97] px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-linear-to-r hover:from-[#005c97] hover:to-[#00cdac] hover:text-white active:scale-95"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#005c97] px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-linear-to-r hover:from-[#005c97] hover:to-[#00cdac] hover:text-white active:scale-95"
            >
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold">Award Winning</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✅</span>
            <span className="font-semibold">500+ Clients</span>
          </div>
        </div>
      </section>


      {/* Features Section with Enhanced Design */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
          backgroundImage: 'linear-gradient(45deg, #667eea 25%, transparent 25%), linear-gradient(-45deg, #667eea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #667eea 75%), linear-gradient(-45deg, transparent 75%, #667eea 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-blue-600 font-bold text-lg mb-4">WHY CHOOSE US</span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              We Combine <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Innovation</span> with Results
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge technology meets proven marketing strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "📈",
                title: "Data-Driven Results",
                description: "We use advanced analytics and insights to optimize your campaigns and maximize ROI. Every decision is backed by real data.",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: "🎯",
                title: "Targeted Strategies",
                description: "Customized marketing solutions tailored to your business goals and audience. One size doesn't fit all, and we know it.",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                icon: "⚡",
                title: "Fast Implementation",
                description: "Quick setup and deployment to get your campaigns running in no time. Time is money, and we value both.",
                gradient: "from-pink-500 to-pink-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-4 overflow-hidden"
              >
                {/* Decorative gradient background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-3xl`}></div>

                <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-5 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Enhanced Visuals */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Track Record</h2>
            <p className="text-xl text-blue-100">Numbers that speak for themselves</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Clients", icon: "👥" },
              { number: "1000+", label: "Projects Completed", icon: "🚀" },
              { number: "250%", label: "Average ROI", icon: "📊" },
              { number: "24/7", label: "Support", icon: "💬" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xl text-blue-100 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview with Enhanced Cards */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
          backgroundImage: 'linear-gradient(45deg, #667eea 25%, transparent 25%), linear-gradient(-45deg, #667eea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #667eea 75%), linear-gradient(-45deg, transparent 75%, #667eea 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-purple-600 font-bold text-lg mb-4">OUR SERVICES</span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Complete <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Marketing Solutions</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to grow your business in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: "🔍", title: "SEO Optimization", color: "from-blue-500 to-blue-600", desc: "Boost rankings" },
              { icon: "📱", title: "Social Media", color: "from-purple-500 to-purple-600", desc: "Engage audiences" },
              { icon: "💰", title: "PPC Advertising", color: "from-pink-500 to-pink-600", desc: "Maximize ROI" },
              { icon: "✍️", title: "Content Strategy", color: "from-green-500 to-green-600", desc: "Create impact" },
            ].map((service, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${service.color} p-10 rounded-3xl text-white text-center transform hover:scale-110 hover:rotate-2 transition-all duration-500 shadow-2xl hover:shadow-3xl overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{service.title}</h3>
                  <p className="text-blue-100 font-semibold">{service.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-14 py-5 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transform animate-pulse"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-28 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, rgba(255,255,255,0.1)), linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, rgba(255,255,255,0.1)), linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, rgba(255,255,255,0.1)), linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, rgba(255,255,255,0.1))',
          backgroundSize: '80px 140px'
        }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 md:p-20 border border-white/30 shadow-2xl">
            <div className="text-8xl mb-8 animate-[float_6s_ease-in-out_infinite]">🚀</div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-white leading-tight">
              Ready to <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-gray-200 leading-relaxed font-light max-w-3xl mx-auto">
              Let's discuss how we can help you achieve your marketing goals and take your business to the next level
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link
                to="/contact"
                className="bg-transparent border-3 border-white text-white px-14 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-2xl hover:scale-110 transform backdrop-blur-sm"
              >
                <span className="relative z-10">Contact Us Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1000px_100%] animate-[shimmer_2s_infinite]"></div>
              </Link>
              <Link
                to="/blog"
                className="bg-transparent border-3 border-white text-white px-14 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-2xl hover:scale-110 transform backdrop-blur-sm"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

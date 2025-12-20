import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-extrabold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MarketingPro
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for digital marketing success. We help businesses grow through innovative strategies and data-driven solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { label: "SEO Optimization", hash: "#seo-optimization" },
                { label: "Social Media Marketing", hash: "#social-media-marketing" },
                { label: "PPC Advertising", hash: "#ppc-advertising" },
                { label: "Content Strategy", hash: "#content-strategy" },
                { label: "Email Marketing", hash: "#email-marketing" },
                { label: "Analytics & Reporting", hash: "#analytics-reporting" },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={`/services${service.hash}`}
                    className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">📧</span>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p>info@marketingpro.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">📞</span>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p>+91 9999888877</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">📍</span>
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p>Phagwara,Punjab</p>
                  <p>Business City, BC 12345</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} MarketingPro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

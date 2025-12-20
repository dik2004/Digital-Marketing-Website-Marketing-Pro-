import rateLimit from "express-rate-limit";

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for contact form
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per windowMs
  message: { error: "Too many contact form submissions, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for creating content
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 creations per hour
  message: { error: "Too many creation requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});


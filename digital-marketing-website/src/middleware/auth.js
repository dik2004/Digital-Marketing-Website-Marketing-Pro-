
import jwt from "jsonwebtoken";

// Simple authentication middleware
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Optional: Admin check middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Admin access required" });
  }
};

// Provider check middleware (allows Providers OR Admins)
export const isProvider = (req, res, next) => {
  if (req.user && (req.user.userType === "provider" || req.user.role === "admin")) {
    next();
  } else {
    return res.status(403).json({ error: "Provider access required" });
  }
};

// Generate JWT token helper
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "user",
      userType: user.userType // Add userType to token
    },
    process.env.JWT_SECRET || "your-secret-key-change-in-production",
    { expiresIn: "7d" }
  );
};

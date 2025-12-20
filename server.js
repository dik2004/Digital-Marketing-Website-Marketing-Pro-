import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "./digital-marketing-website/src/config/db.js";
import { swaggerSpec } from "./digital-marketing-website/src/config/swagger.js";
import { apiLimiter, contactLimiter } from "./digital-marketing-website/src/middleware/rateLimiter.js";
import serviceRoutes from "./digital-marketing-website/src/routes/serviceRoutes.js";
import leadRoutes from "./digital-marketing-website/src/routes/leadRoutes.js";
import blogRoutes from "./digital-marketing-website/src/routes/blogRoutes.js";
import authRoutes from "./digital-marketing-website/src/routes/authRoutes.js";
import subscriberRoutes from "./digital-marketing-website/src/routes/subscriberRoutes.js";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from root directory
dotenv.config({ path: join(__dirname, ".env") });

const app = express();

// CORS configuration - restrict in production
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? (process.env.FRONTEND_URL || "http://localhost:5173")
    : true, // Allow all origins in development
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging with Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // Detailed logging for development
} else {
  app.use(morgan("combined")); // Standard Apache combined log format for production
}

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Digital Marketing API Documentation",
}));

// Connect to database (async)
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/leads", contactLimiter, leadRoutes); // Apply stricter rate limiting to contact form

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});

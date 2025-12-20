import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authenticate, generateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - userType
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [client, provider]
 *                 description: client = wants to take services, provider = wants to give services
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: "Name, email, password and user type are required" });
    }

    if (!["client", "provider"].includes(userType)) {
      return res.status(400).json({ error: "Invalid user type. Use 'client' or 'provider'." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      userType,
      role: "user",
    });

    const token = generateToken({ id: user._id, email: user.email, role: user.role, userType: user.userType });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Try real users from database first
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        userType: existingUser.userType,
      });

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          userType: existingUser.userType,
          role: existingUser.role,
        },
      });
    }

    // 2) Fallback to existing demo users (for admin/testing)
    const demoUsers = [
      { id: "1", email: "admin@marketingpro.com", password: "admin123", role: "admin", userType: "provider" },
      { id: "2", email: "user@marketingpro.com", password: "user123", role: "user", userType: "client" },
    ];

    const demoUser = demoUsers.find((u) => u.email === email && u.password === password);

    if (!demoUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(demoUser);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        role: demoUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/stats:
 *   get:
 *     summary: Get simple statistics about registered users
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics
 */
router.get("/stats", authenticate, isAdmin, async (req, res) => {
  try {
    const total = await User.countDocuments();
    const clients = await User.countDocuments({ userType: "client" });
    const providers = await User.countDocuments({ userType: "provider" });

    res.json({
      total,
      clients,
      providers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


import express from "express";
import { subscribeToNewsletter, getAllSubscribers } from "../controllers/subscriberController.js";
import { authenticate, isAdmin } from "../middleware/auth.js"; // Optional: restrict view to admin

const router = express.Router();

/**
 * @swagger
 * /api/subscribers:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscribed successfully
 */
router.post("/", subscribeToNewsletter);

/**
 * @swagger
 * /api/subscribers:
 *   get:
 *     summary: Get all subscribers (Admin only)
 *     tags: [Subscribers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscribers
 */
router.get("/", authenticate, isAdmin, getAllSubscribers);

export default router;

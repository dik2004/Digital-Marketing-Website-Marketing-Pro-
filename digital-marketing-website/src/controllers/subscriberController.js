import Subscriber from "../models/Subscriber.js";

export const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Check if already subscribed
        const existing = await Subscriber.findOne({ email: email.toLowerCase() });
        if (existing) {
            if (!existing.isActive) {
                // Reactivate if previously unsubscribed
                existing.isActive = true;
                await existing.save();
                return res.json({ message: "Welcome back! You have been re-subscribed." });
            }
            return res.status(400).json({ error: "Email is already subscribed" });
        }

        await Subscriber.create({ email });
        res.status(201).json({ message: "Thank you for subscribing!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email is already subscribed" });
        }
        res.status(500).json({ error: error.message });
    }
};

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

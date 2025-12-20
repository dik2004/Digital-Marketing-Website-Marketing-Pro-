
import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../src/models/Service.js";
import { services } from "../src/data/services.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, "../../.env") });

const seedDB = async () => {
    try {
        // Connect to DB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Clear existing services
        await Service.deleteMany({});
        console.log("Services cleared");

        // Insert new services
        // Remove _id from data to let Mongo generate new ones
        const servicesToInsert = services.map(({ _id, ...rest }) => rest);

        await Service.insertMany(servicesToInsert);
        console.log("Services inserted successfully");

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();

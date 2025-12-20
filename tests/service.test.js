import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import serviceRoutes from "../digital-marketing-website/src/routes/serviceRoutes.js";
import Service from "../digital-marketing-website/src/models/Service.js";

const app = express();
app.use(express.json());
app.use("/api/services", serviceRoutes);

describe("Service API Tests", () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/digital-marketing-test";
    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    // Clean up test data
    await Service.deleteMany({});
    await mongoose.connection.close();
  });

  describe("GET /api/services", () => {
    it("should get all services", async () => {
      const response = await request(app).get("/api/services");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /api/services", () => {
    it("should create a new service", async () => {
      const newService = {
        title: "Test Service",
        description: "Test Description",
        price: 9999,
      };

      const response = await request(app)
        .post("/api/services")
        .send(newService);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newService.title);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/services")
        .send({ title: "Incomplete Service" });

      expect(response.status).toBe(400);
    });
  });
});


import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Digital Marketing API",
      version: "1.0.0",
      description: "API documentation for Digital Marketing Website with Services, Blog, and Lead Management modules",
      contact: {
        name: "API Support",
        email: "info@marketingpro.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
    apis: ["./digital-marketing-website/src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);


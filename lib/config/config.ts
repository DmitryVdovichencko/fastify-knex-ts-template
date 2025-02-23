import { FastifySwaggerOptions, SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiConfigOptions, FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const config = {
  fastify: {
    host: "localhost",
    port: 8000,
  },
  fastifyInit: {
    // trustProxy: 2,
    // disableRequestLogging: true,
    logger: true,
  },

  // swaggerUi: {
  //   routePrefix: "/docs",
  //   exposeRoute: true,
  // },
};

export const swagger: SwaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "service", description: "Service related end-points" },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
};

export const swaggerUi: FastifySwaggerUiOptions = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  transformSpecificationClone: true
}

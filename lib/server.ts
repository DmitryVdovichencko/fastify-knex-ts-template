import path from "node:path";
import {
  FastifyInstance,
  FastifyContextConfig,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fp from "fastify-plugin";
import autoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import fastifyKnexPlugin from "./plugins/knex";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { config as appConfig, swagger, swaggerUi } from "./config/config";
import { config as databaseConfig } from "./config/database";
import fastifyJwt, { FastifyJWT } from "@fastify/jwt";
import { pingRoute } from "./routes/ping/ping.route";
import { userRoute } from "./routes/user/user.route";
/**
 * Configure and starts Fastify server with all required plugins and routes
 * @async
 * @param {Fastify.Server} server - Fastify server instance
 * @param {Object} config - optional configuration options (default to ./config module)
 *                          May contain a key per plugin (key is plugin name), and an extra
 *                          'fastify' key containing the server configuration object
 * @returns {Fastify.Server} started Fastify server instance
 */

async function plugin(server: FastifyInstance, config: FastifyContextConfig) {
  server
    .register(cors, {})
    .register(fastifySwagger, swagger)
    .register(fastifySwaggerUi, swaggerUi)
    .register(userRoute, { prefix: "user" })
    .register(pingRoute, { prefix: "ping" })
    .register(fastifyKnexPlugin, databaseConfig)
    .register(fastifyJwt, { secret: appConfig.auth.jwtSecret })
    .decorate(
      "authenticate",
      async (req: FastifyRequest, reply: FastifyReply) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return reply.status(401).send({ message: "Authentication required" });
        }
        try {
          // here decoded will be a different type by default but we want it to be of user-payload type
          const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
          req.user = decoded;
        } catch (error) {
          return reply.status(401).send({ message: "Unauthorized" });
        }
      }
    );

  server.setErrorHandler((err, req, res) => {
    req.log.error({ req, res, err }, err && err.message);
    err.message = "An error has occurred";
    res.send(err);
  });

  // Trick to handle empty body on POST
  // because POST {{APIURL}}/articles/{{slug}}/favorite will be done without a body
  server.addHook("onRequest", async (req, res) => {
    if (
      req.headers["content-type"] === "application/json" &&
      req.headers["content-length"] === "0"
    ) {
      req.headers["content-type"] = "empty";
    }
  });
  server.addContentTypeParser("empty", (request, body, done) => {
    done(null, {});
  });
}

export default fp(plugin);

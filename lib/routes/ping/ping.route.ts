import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pingService } from "./ping.controller";
import { schema } from "./schema";

// User routes
export const pingRoute = async (app: FastifyInstance) => {
  app.get("/", schema, async (req: FastifyRequest, reply: FastifyReply) =>
    pingService(req, reply)
  );
};
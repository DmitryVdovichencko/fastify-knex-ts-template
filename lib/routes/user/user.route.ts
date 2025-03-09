import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { registerUser } from "./user.controller";
import { registerUserSchema } from "./schema";

// User routes
export const userRoute = async (app: FastifyInstance) => {
  app.post("/register", registerUserSchema, async (req: FastifyRequest, reply: FastifyReply) =>
    registerUser(req, reply, app)
  );
};

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getUserList, registerUser } from "./user.controller";
import { registerUserSchema, userListSchema } from "./schema";

// User routes
export const userRoute = async (app: FastifyInstance) => {
  app.post("/register", registerUserSchema, async (req: FastifyRequest, reply: FastifyReply) =>
    registerUser(req, reply, app)
  );
	app.get("/list", userListSchema, async (req: FastifyRequest, reply: FastifyReply) =>
    getUserList(req, reply, app)
  );
};

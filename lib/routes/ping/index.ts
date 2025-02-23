import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { schema } from "./schema";

const PingRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
	server.get("/api/ping", schema, async (req: FastifyRequest, reply: FastifyReply) => {
		reply.code(200).send({ message: "pong" });
	})
};

export default fp(PingRoute);

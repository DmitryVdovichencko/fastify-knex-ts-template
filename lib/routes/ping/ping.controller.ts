import { FastifyReply, FastifyRequest } from "fastify";

export const pingService = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.code(200).send({ message: "pong" });
}
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { schema } from "./schema";

const UsersRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
	server.get("/api/user/list", schema, async (req: FastifyRequest, reply: FastifyReply) => {
		const users = await server.knex.select('*').from('user').limit(100).offset(0)
		reply.code(200).send({ list: users });
	})
};

export default fp(UsersRoute);
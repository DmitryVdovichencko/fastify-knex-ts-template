import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid } from 'uuid';
import { hash } from 'node:crypto';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply, server: FastifyInstance) => {
	const { username, password } = request.body as { username: string, password: string };

	// Check if the username already exists
	const user = await server.knex.select('*').from('user').where('username', username).first()

	if (user) {
		return reply.status(400).send({ message: "Username already exists" });
	}

	// Create the user
	try {
			const newUser = await server.knex.insert(
				{
					id: uuid(),
					email: username,
					passwordHash: await hash('sha256', password)
				}
			).into('user').returning('*');
			return reply.status(201).send({ message: "User created successfully", user: newUser });
	} catch (error) {
			return reply.status(500).send({ error: error, message: "Failed to create user" });
	}

};

export const getUserList = async (request: FastifyRequest, reply: FastifyReply, server: FastifyInstance) => {
		const users = await server.knex.select('*').from('user').limit(100).offset(0);

		reply.code(200).send({ list: users });
};


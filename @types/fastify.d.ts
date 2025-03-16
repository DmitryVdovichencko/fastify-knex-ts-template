import { JWT } from '@fastify/jwt';
import * as http from 'http';
import { Knex } from 'knex';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
  > {
    knex: Knex;
		authenticate: any
  }

	interface FastifyRequest {
    jwt: JWT
  }
}

type UserPayload = {
  id: string
  email: string
  name: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}
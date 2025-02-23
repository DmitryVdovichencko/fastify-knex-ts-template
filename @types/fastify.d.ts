import * as http from 'http';
import { Knex } from 'knex';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
  > {
    knex: Knex;
  }
}
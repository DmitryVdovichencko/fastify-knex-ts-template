import Fastify from "fastify";
import { config } from "./lib/config/config";
import startServer from "./lib/server";

export const buildFastify = () => {
	const server = Fastify(config.fastifyInit);
	server.register(startServer);

	// await server.listen(config.fastify)
	return server
}

export const main = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });

  const server = Fastify(config.fastifyInit);
  server.register(startServer);

  const address = await server.listen(config.fastify);
  server.log.info(`Server running at: ${address}`);
};

main();

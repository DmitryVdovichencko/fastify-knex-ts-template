import type { Knex } from "knex";

require('dotenv').config();
console.log(process.env.DB_HOST);

const config: Knex.Config = {
	client: 'postgresql',
	connection: {
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
	},
	migrations: {
		extension: 'ts',
		directory: './lib/db/migrations',
	},
};
module.exports = config;

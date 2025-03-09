

import { FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify/types/instance'
import Knex from 'knex'

function knexPlugin(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  if(!fastify.knex) {
    const knex = Knex(options)
    fastify.decorate('knex', knex)

    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.knex === knex) {
        fastify.knex.destroy(done)
      }
    })
  }

  done()
}

export default fp(knexPlugin, { name: 'fastify-knex-example' })
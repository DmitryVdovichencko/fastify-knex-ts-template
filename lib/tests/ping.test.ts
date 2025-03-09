import {buildFastify} from '../../index'
import * as http from 'http';
import { describe, it, before, after } from 'node:test'
import assert from 'assert'
import { Knex } from 'knex';
import { FastifyInstance } from 'fastify'

describe('GET /health HTTP', () => {
  let app: FastifyInstance

  before(async () => {
    app = buildFastify()
  })

  after(async () => {
    await app.close()
  })

  it('GET /health returns status 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/ping'
    })

    assert.strictEqual(response.statusCode, 200)
    assert.strictEqual(JSON.parse(response.payload).message, 'pong')
  })
})

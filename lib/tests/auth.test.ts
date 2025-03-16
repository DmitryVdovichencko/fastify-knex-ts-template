import {buildFastify} from '../../index'
import * as http from 'http';
import { describe, it, before, after } from 'node:test'
import assert from 'assert'
import { Knex } from 'knex';
import { FastifyInstance } from 'fastify'

describe('Auth user testing', () => {
  let app: FastifyInstance

  before(async () => {
    app = buildFastify()
  })

  after(async () => {
    await app.close()
  })

  it('GET user data returns status 401 without auth header', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user/me'
    })

    assert.strictEqual(response.statusCode, 401)
    assert.strictEqual(JSON.parse(response.payload).message, 'Authentication required')
  })

	it('GET user data returns status 401 with incorrect auth token', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user/me',
			headers:{
				authorization: 'Bearer incorrect-token'
			}
    })

    assert.strictEqual(response.statusCode, 401)
    assert.strictEqual(JSON.parse(response.payload).message, 'Unauthorized')
  })
})
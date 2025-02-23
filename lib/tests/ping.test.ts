import tap from 'tap'
import supertest from 'supertest'
import { buildFastify } from '../../index'

tap.test('GET `/` route', async (t) => {
  const fastify = buildFastify()

  t.teardown(() => fastify.close())
  
  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/api/ping')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
	
  t.equal(response.body.message, 'pong');
})
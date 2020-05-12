import { FastifyInstance } from 'fastify'
import { createServer } from '../../../core'

let server: FastifyInstance

beforeAll(async () => {
  server = await createServer({ logger: false })
})

afterAll(() => {
  server.close()
})

test('GET /user', async () => {
  const result = await server.inject({
    url: '/user',
    method: 'GET'
  })
  expect(result.payload).toBe('{"error":true,"message":"User not found"}')
})

import { FastifyInstance } from 'fastify'
import { createServer } from '../../core'

let server: FastifyInstance

beforeAll(async () => {
  server = await createServer({ logger: false })
})

afterAll(() => {
  server.close()
})

test('GET /hello', async done => {
  const result = await server.inject({
    url: '/hello/',
    method: 'GET'
  })
  expect(result.payload).toBe('{"data":"Hello world"}')
  done()
})

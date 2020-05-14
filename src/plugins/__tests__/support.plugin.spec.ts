import fp from 'fastify-plugin'
import { plugin } from '../support.plugin'
import fastify from 'fastify'

const server = fastify()

beforeAll(async () => {
  server.register(fp(plugin))
})

afterAll(() => {
  server.close()
})

describe('supportPlugin test', () => {
  test('/', async done => {
    await server.ready()
    expect(server.someSupport()).toBe('hugs')
    done()
  })
})

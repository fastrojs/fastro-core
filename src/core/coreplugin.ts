import fp from 'fastify-plugin'
import { FastifyReply, FastifyError } from 'fastify'
import { ServerResponse } from 'http'

export const corePlugin = fp(async function (fastify, opts, next) {
  fastify
    .decorateReply('ok', function<T> (this: FastifyReply<ServerResponse>, payload: T) {
      this
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: payload })
    })
    .decorateReply('error', function (this: FastifyReply<ServerResponse>, error: FastifyError) {
      let code = error.statusCode
      if (!code) code = 500
      this.code(code)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: true, message: error.message })
    })
  next()
})

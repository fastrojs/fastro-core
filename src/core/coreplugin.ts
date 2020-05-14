import fp from 'fastify-plugin'
import { FastifyError, FastifyReply, FastifyReplyInterface } from 'fastify'

export const corePlugin = fp(function (fastify, opts, next) {
  fastify
    .decorateReply('ok', function<T> (this: FastifyReplyInterface, payload: T): FastifyReply {
      return this
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: payload })
    })
    .decorateReply('error', function (this: FastifyReplyInterface, error: FastifyError): FastifyReply {
      let code = error.statusCode
      if (!code) code = 500
      return this.code(code)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: error.message, error: true })
    })
  next()
})

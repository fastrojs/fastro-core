import { Controller, Get } from '../core'
import { FastifyReply, FastifyRequest } from 'fastify'

@Controller()
export class HelloController {
  @Get()
  hello (request: FastifyRequest, reply: FastifyReply): FastifyReply {
    return reply.ok('Hello world')
  }
}

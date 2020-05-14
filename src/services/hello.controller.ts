import { Controller, Get } from '../core'
import { FastifyReply, FastifyReplyInterface, FastifyRequestInterface } from 'fastify'

@Controller()
export class HelloController {
  @Get()
  hello (request: FastifyRequestInterface, reply: FastifyReplyInterface): FastifyReply {
    return reply.ok('Hello world')
  }
}

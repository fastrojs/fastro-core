import { Controller, Get } from '../core'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'

@Controller()
export class HelloController {
  @Get()
  async hello (request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    reply.send('hello')
  }
}

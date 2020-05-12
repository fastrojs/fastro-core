import { Controller, InjectService, Get } from '../../core'
import { UserService } from './user.service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

@Controller({ prefix: 'user' })
export class UserController {
  @InjectService(UserService)
  userService: UserService

  @Get()
  async getAll (request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<void> {
    const users = await this.userService.helloUser()
    reply.sendOk(users)
  }
}

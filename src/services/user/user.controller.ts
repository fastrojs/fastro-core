import { Controller, InjectService, Get } from '../../core'
import { UserService } from './user.service'
import { FastifyReply, FastifyRequest } from 'fastify'

@Controller({ prefix: 'user' })
export class UserController {
  @InjectService(UserService)
  userService: UserService

  @Get()
  async getAll (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const users = await this.userService.helloUser()
    return reply.ok(users)
  }
}

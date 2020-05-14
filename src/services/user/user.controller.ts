import { Controller, InjectService, Get } from '../../core'
import { UserService } from './user.service'
import { FastifyRequestInterface, FastifyReplyInterface } from 'fastify'

@Controller({ prefix: 'user' })
export class UserController {
  @InjectService(UserService)
  userService: UserService

  @Get()
  async getAll (request: FastifyRequestInterface, reply: FastifyReplyInterface): Promise<void> {
    const users = await this.userService.helloUser()
    reply.ok(users)
  }
}

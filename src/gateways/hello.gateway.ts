import { Gateway, InjectController } from '../core'
import { HelloController } from '../services/hello.controller'

@Gateway({ prefix: 'hello' })
export class WebGateway {
  @InjectController(HelloController)
  userController: HelloController
}

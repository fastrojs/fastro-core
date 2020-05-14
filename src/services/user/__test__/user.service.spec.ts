import { loader, serviceContainer } from '../../../core'
import { UserService } from '../user.service'

let service: UserService

beforeAll(async () => {
  try {
    await loader()
    service = serviceContainer.get('UserService')
  } catch (error) {
    console.log(error)
  }
}, 3000)

describe('user service', () => {
  test('hello', async () => {
    const result = await service.helloUser()
    expect(result).toBe('Hello')
  })
})

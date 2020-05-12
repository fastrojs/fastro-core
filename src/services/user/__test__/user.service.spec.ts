import { loader, serviceContainer } from '../../../core'
import { UserService } from '../user.service'

let service: UserService

beforeAll(async () => {
  try {
    await loader()
    service = serviceContainer.get('UserService')
    service.deleteAll()
  } catch (error) {
    console.log(error)
  }
}, 3000)

describe('user service', () => {
  test('add user', async () => {
    const payload = {
      email: 'pram2016@gmail.com',
      username: 'zaid3',
      password: 'secret'
    }
    const result = await service.addUser(payload)
    expect(result.documentId).toBeDefined()
  })

  test('get user', async () => {
    const user = await service.getUser('zaid3')
    expect(user.username).toBe('zaid3')
  })

  test('update user', async () => {
    const user = await service.getUser('zaid3')
    if (!user.documentId) throw new Error('user empty')
    const result = await service.updateUser({
      username: 'zaid3',
      email: 'tes@gmail.com',
      password: 'abc',
      documentId: user.documentId
    })
    expect(result.email).toBe('tes@gmail.com')
  })

  test('get all user', async () => {
    const allUser = await service.getAllUser()
    expect(allUser.length).toBeGreaterThan(0)
  })

  test('delete user', async () => {
    let user = await service.getUser('zaid3')
    if (!user.documentId) throw new Error('user empty')
    service.deleteUser(user.documentId)
    user = await service.getUser('zaid3')
    expect(user).toBeUndefined()
  })
})

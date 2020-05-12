import { Service } from '../../core'

export type User = {
  documentId?: string;
  username: string;
  email: string;
  password: string;
}

@Service()
export class UserService {
  async helloUser (): Promise<string> {
    return 'Hello'
  }
}

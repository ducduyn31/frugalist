import { AuthOptions } from 'next-auth'

export const authPages: AuthOptions['pages'] = {
  signIn: '/login',
}

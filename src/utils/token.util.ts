import jwt from 'jsonwebtoken'

interface IGenerateTokenProps {
  id: string
}

export class Token {
  private sign: string = process.env.SECRET_KEY_JWT || ''


  generateToken(data:IGenerateTokenProps):string {
    if (!this.sign) {
      throw new Error('Secret key is missing')
    }

    return jwt.sign(data, this.sign, {expiresIn: '30d'})
  }

  verify(token:string): IGenerateTokenProps | null {
    if (!this.sign) {
      throw new Error('Sign not enity')
    }

    try {
      const decode = jwt.verify(token, this.sign)
      if (typeof decode === 'string') return null
      return decode as IGenerateTokenProps
    } catch (e) {
      if (e instanceof Error) {
        console.error('JWT verification failed:', e)
      } else {
        console.log('Something was worng with Token verify!')
      }
      return null
    }
  }
}


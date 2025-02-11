import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface IGenerateTokenProps {
  id: string
}

const sign = process.env.SECRET_KEY_JWT || ''

export const generate = (data) => jwt.sign(data, sign, {expiresIn: '1d'})

export const verify = (token: string) => jwt.verify(token, sign)

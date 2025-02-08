import {Request, Response, NextFunction} from 'express'
import { UserModel } from 'models/User.model'
import { Token } from 'utils/token.util'

export const authenticated = async (req:Request, res:Response, next:NextFunction) => {
  const {token} = req.cookies as {token?: string}

  if (!token) {
    res.status(401).json({error: 'Unauthorized'})
    return
  }

  const tokenData = new Token().verify(token)

  if (!tokenData || !tokenData.id) {
    res.status(401).json({ error: "Invalid token" })
    return
  }

  const user = await UserModel.findOne({ _id: tokenData.id })

  if (!user) {
    res.status(402).json({error: 'Authenticated user not found'})

    return
  }

  req.user = user

  next()
}

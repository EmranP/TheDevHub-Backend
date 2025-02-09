import {Request, Response, NextFunction} from 'express'
import { UserModel } from 'models/User.model'
import { verify } from 'utils/token.util'

export const authenticated = async (req:Request, res:Response, next:NextFunction) => {
  const tokenData = verify(req.cookies.token)

  const user = await UserModel.findOne({ _id: tokenData.id })

  if (!user) {
    res.status(402).send({error: 'Authenticated user not found'})

    return
  }

  req.user = user

  next()
}

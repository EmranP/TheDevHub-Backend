import { Router, Request, Response } from "express";
import {  mappingUser } from "utils/mapping.util";
import { loginUser } from "controllers/user/login.controller";
import { IUserSchema } from "models/User.model";

interface IRequestBody extends Request {
  body: {
    login: string
    password: string
  }
}

const routeAuthLogin = Router()

routeAuthLogin.post('/login', async (req:IRequestBody, res:Response):Promise<void> => {
  try {
    const {login, password} = req.body

    const {user, token} = await loginUser(login, password)

    res.status(201)
        .cookie('token', token, {httpOnly: true})
        .send({error: null, user: mappingUser(user as IUserSchema)})
  } catch (e) {
    res.status(500).send({error: e instanceof Error ? e.message : 'Unknown error'})
  }
})


export default routeAuthLogin

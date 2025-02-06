import { loginUser } from "controllers/user/login.controller";
import { registerUser } from "controllers/user/register.controller";
import { Router, Request, Response } from "express";
import { IUserSchema } from "models/User.model";
import { mappingUser } from "utils/mappingUser.util";


const routeAuth = Router()

// Registore

interface IRequestBody extends Request {
  body: {
    login: string
    password: string
  }
}

routeAuth.post('/register', async (req:IRequestBody, res:Response):Promise<void> => {
  try {
    const {login, password} = req.body
    const {user, token} = await registerUser(login, password)

    res.status(201)
        .cookie('token', token, {httpOnly: true})
        .send({error: null, user: mappingUser(user)})
  } catch (e) {
    res.status(500).send({error: e instanceof Error ? e.message : 'Unknown error'})
  }
})

// Login
routeAuth.post('/login', async (req:IRequestBody, res:Response):Promise<void> => {
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

// Logout
routeAuth.post('/logout', async (req:Request, res:Response):Promise<void> => {
  try {
    res.status(201)
      .cookie('token', '', {httpOnly: true})
      .send({})
  } catch (e) {
    res.status(500).send({error: e instanceof Error ? e.message : 'Unknown error'})
  }
})


export default routeAuth

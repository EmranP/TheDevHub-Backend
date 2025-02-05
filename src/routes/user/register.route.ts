import { registerUser } from "controllers/user/register.controller";
import { Router, Request, Response } from "express";
import { mappingUser } from "utils/mapping.util";

interface IRequestBody extends Request {
  body: {
    login: string
    password: string
  }
}

const routeAuthRegister = Router()

routeAuthRegister.post('/register', async (req:IRequestBody, res:Response):Promise<void> => {
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


export default routeAuthRegister

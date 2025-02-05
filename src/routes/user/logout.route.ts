import { Router, Request, Response } from "express";



const routeAuthLogout = Router()

routeAuthLogout.post('/logout', async (req:Request, res:Response):Promise<void> => {
  try {
    res.status(201)
      .cookie('token', '', {httpOnly: true})
      .send({})
  } catch (e) {
    res.status(500).send({error: e instanceof Error ? e.message : 'Unknown error'})
  }
})


export default routeAuthLogout

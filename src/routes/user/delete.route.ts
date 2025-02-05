import { ROLE } from "constants/roles";
import { deleteUser } from "controllers/user/delete.controller";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";

const routeUsersRemove = Router()

routeUsersRemove.delete('/remove/:id', hasRole([ROLE.ADMIN]), async (req:Request, res:Response) => {
  try {
    const {id} = req.params as {id: string}

    if (!id) {
      res.status(404).send({error: 'User not found'})

      return
    }

    await deleteUser(id)

    res.status(201).send({error: null})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
})

export default routeUsersRemove

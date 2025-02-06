import { ROLE } from "constants/roles";
import { deleteUser } from "controllers/user/delete.controller";
import { updateUser } from "controllers/user/edit.controller";
import { getUsers } from "controllers/user/getUsersWithRoles.route";
import { Router, Request, Response } from "express";
import { authenticated } from "middlewares/authenticated.middleware";
import { hasRole } from "middlewares/hasRole.middleware";
import { mappingUser } from "utils/mappingUser.util";

const routeUsers = Router()

routeUsers.get('/', authenticated, hasRole([ROLE.ADMIN]), async (req:Request, res:Response):Promise<void> => {
  try {
    const users = await getUsers()

    if (!users) {
      res.status(404).send({error: 'Users not found'})

      return
    }

    res.status(200).send({data: users.map(mappingUser)})
  } catch (e) {
    console.error("❌ Server Error:", e);
    res.status(500).json({ error: "Internal Server Error" });

    return
  }
})

routeUsers.patch('/edit/:id', authenticated, hasRole([ROLE.ADMIN]), async (req:Request, res:Response) => {
  try {
    const {id} = req.params as {id: string}
    const {roleId} = req.body as {roleId:  number}

    if (!id || !roleId) {
      res.status(404).send({error: 'Error'})

      return
    }

    const newUser = await updateUser(id, {
        role: roleId
    })

    if (!newUser) {
      res.status(404).send({error: 'User not found'})

      return
    }

    res.status(201).send({updateData: mappingUser(newUser)})
  } catch (e) {
    console.error("❌ Server Error:", e);
    res.status(500).json({ error: "Internal Server Error" });

    return
  }
})

routeUsers.delete('/remove/:id', authenticated, hasRole([ROLE.ADMIN]), async (req:Request, res:Response) => {
  try {
    const {id} = req.params as {id: string}

    if (!id) {
      res.status(404).send({error: 'User not found'})

      return
    }

    await deleteUser(id)

    res.status(201).send({error: null})
  } catch (e) {
    console.error("❌ Server Error:", e);
    res.status(500).json({ error: "Internal Server Error" });

    return
  }
})

export default routeUsers

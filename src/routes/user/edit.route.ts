import { ROLE } from "constants/roles"
import { updateUser } from "controllers/user/edit.controller"
import { Router, Request, Response } from "express"
import { hasRole } from "middlewares/hasRole.middleware"
import { mappingUser } from "utils/mappingUser.util"


const routeUsersEdit = Router()

routeUsersEdit.patch('/edit/:id', hasRole([ROLE.ADMIN]), async (req:Request, res:Response) => {
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
     if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routeUsersEdit

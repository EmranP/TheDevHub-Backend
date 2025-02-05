import { ROLE } from "constants/roles";
import { getUsers } from "controllers/user/getUsersWithRoles.route";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";
import { mappingUser } from "utils/mappingUser.util";

const routeUsersGet = Router()
// May be error to path http
routeUsersGet.get('/', hasRole([ROLE.ADMIN]), async (req:Request, res:Response):Promise<void> => {
  try {
    const users = await getUsers()

    if (!users) {
      res.status(404).send({error: 'Users not found'})

      return
    }

    res.status(200).send({data: users.map(mappingUser)})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routeUsersGet

import { ROLE } from "constants/roles";
import { getRoles } from "controllers/user/getUsersWithRoles.route";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";

const routeRoles = Router()
// May be error to path http not found !
routeRoles.get('/', hasRole([ROLE.ADMIN]), async (req:Request, res:Response) => {
  try {
    const roles = getRoles()

    if (!roles) {
      res.status(404).send({error: 'Roles data not found'})

      return
    }

    res.status(200).send({dataRoles: roles})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})


export default routeRoles

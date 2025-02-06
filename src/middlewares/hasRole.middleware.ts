import { ROLE } from "constants/roles";
import { Request, Response, NextFunction } from "express";
import { IUserSchema } from "models/User.model";

interface AuthRequest extends Request {
  user?: IUserSchema;
}

export const hasRole = (roles: ROLE[]) => {
  return  (req:AuthRequest, res:Response, next:NextFunction) => {

    if (!req.user || !req.user.role) {
      res.status(401).send({error: 'Request user not found'})

      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).send({error: 'Access denied'})

      return
    }

    next()
  }
}

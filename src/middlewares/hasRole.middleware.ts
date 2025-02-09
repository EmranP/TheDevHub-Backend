import { ROLE } from "constants/roles";
import { Request, Response, NextFunction } from "express";
import { IUserSchema } from "models/User.model";

interface AuthRequest extends Request {
  user?: IUserSchema;
}

export const hasRole = (roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      res.send({error: 'Access denied'})

      return
    }

    next()
  }
}


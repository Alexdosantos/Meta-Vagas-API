import { NextFunction, Request, Response } from "express";
import { CommoError } from "../commoError/CommoError";
import JWT from "jsonwebtoken";

class Authentication {
  static authentic(req: Request, res: Response, next: NextFunction) {
    try {
      const { headers } = req;

      if (!headers || !headers.authorization) {
        return res
          .status(401)
          .json(CommoError.ErroBuild("Autorização não concedida", 401));
      }
      const [, token] = headers.authorization?.split(" ");

      JWT.verify(token, process.env.SECRET_KEY as string);
    } catch (error) {
      return res.json(CommoError.ErroBuild("Autorização não concedida", 401));
    }
    next()
  }
}

export { Authentication };

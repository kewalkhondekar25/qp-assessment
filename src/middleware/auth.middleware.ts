import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (role: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token){
      res.status(401).json({
        message: "No Token Provided"
      });
      return;
    };

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, name: string, email: string, role: string};

    if(!role.includes(decodeToken.role)){
      res.status(403).json({
        message: "Unauthorize to access"
      });
    };

    (req as any).user = decodeToken;
    next();
  };

};
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../utils/user";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  //extract token from headers
  const jwtHeader = req.header("Authorization");
  if(!jwtHeader){
    res.status(401).json({
      message: "Unauthorize"
    });
    return;
  };
  //verify
  if(!process.env.JWT_SECRET){
    res.status(400).json({
      message: "Missing JWT secret"
    });
    return;
  };

  const decoded: any = jwt.verify(jwtHeader, process.env.JWT_SECRET);

  const currentUserName = user.name;
  if(currentUserName !== decoded.userName){
    res.status(401).json({
      message: "Unauthorize user"
    });
    return;
  };

  // req.user = currentUserName;

  console.log(decoded);
  next();
};

export { authMiddleware };
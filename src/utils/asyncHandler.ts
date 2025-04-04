import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<any> > (fn: T): RequestHandler => {
  
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error)
    }
  };

};

export { asyncHandler };
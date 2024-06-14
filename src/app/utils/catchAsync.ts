import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (funct: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(funct(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;

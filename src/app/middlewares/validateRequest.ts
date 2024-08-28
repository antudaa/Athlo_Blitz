import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const requestValidator = (schema: AnyZodObject) => {
  // return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //   await schema.parseAsync({
  //     body: req.body,
  //     cookies: req.cookies,
  //   });
  //   next();
  // });
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body directly
    await schema.parseAsync(req.body);
    next();
  });
};

export default requestValidator;

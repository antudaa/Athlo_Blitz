import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Route not Found",
  });
};

export default notFoundRoute;

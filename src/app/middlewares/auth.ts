import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import sendResponse from "../utils/sendResponse";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // checking if the token is missing
  if (!token) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Authorization token missing",
    });
  }

  try {
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret_token as string,
    ) as JwtPayload;

    // Attach user id and role to request object
    (req as any).userId = decoded.sub;
    (req as any).userRole = decoded.role;
    next();
  } catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: "Invalid token!",
    });
  }
};

// Middleware for authorize Admin
const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret_token as string,
  ) as JwtPayload;

  if (decoded?.userRole !== "admin") {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  } else {
    next();
  }
};

// Middleware for authorize Users
const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret_token as string,
  ) as JwtPayload;

  if (decoded?.userRole !== "user") {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  } else {
    next();
  }
};

// Function to verify jwt token
const getUserIdFromToken = (req: Request) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret_token as string,
  ) as JwtPayload;
  return decoded.userId;
};

export {
  authenticateUser,
  authorizeAdmin,
  authorizeUser,
  getUserIdFromToken,
};

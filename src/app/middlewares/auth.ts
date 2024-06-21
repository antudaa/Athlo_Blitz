import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../Errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, `Your are not Authorized!`)
        }

        jwt.verify(token, config.jwt_access_secret_token as string, function (err, decoded) {
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            }
            const role = (decoded as JwtPayload).userRole;

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
            }

            req.user = decoded as JwtPayload;
            next();
        });
    });
};

export default auth;
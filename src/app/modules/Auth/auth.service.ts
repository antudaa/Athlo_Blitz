import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (!(await User.isUserDeleted(payload?.email))) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  const jwtPayload = {
    userEmail: user.email,
    userRole: user.role,
    userId: user._id?.toString(),
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret_token as string,
    { expiresIn: "60d" },
  );

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  loginUser,
};

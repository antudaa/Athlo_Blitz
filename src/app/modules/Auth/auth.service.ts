import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser, TPasswordChange } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (!(await User.isUserExistsByEmail(payload?.email))) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  const jwtPayload = {
    userEmail: user.email,
    userRole: user.role,
    userId: user._id as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    config.jwt_access_expire_time as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_refrest_secret_token as string,
    config.jwt_refrest_expires_time as string,
  )

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (userInfo: JwtPayload, payload: TPasswordChange) => {

  const { oldPassword, newPassword } = payload;

  const user = await User.isUserExistsByEmail(userInfo.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exists!');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  const status = user?.status;

  if (status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }
  console.log('User not blocked')
  console.log(oldPassword, user?.password);

  if (!(await User.isPasswordMatched(oldPassword, user?.password))) {
    console.log('Password not matched')
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
  }

  console.log('Password Matched');

  const hashedPassword = await User.hashPassword(newPassword);

  const result = await User.findOneAndUpdate({
    _id: userInfo.userId,
    role: userInfo.userRole,
  },
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_refrest_secret_token as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    await User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userEmail: user.email,
    userRole: user.role,
    userId: user._id as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    config.jwt_access_expire_time as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};

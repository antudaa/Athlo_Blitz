import { RequestHandler } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const signUpUser: RequestHandler = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await UserService.createUserIntoDB(userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully.",
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data retrieved successfully.",
    data: result,
  });
});

export const UserControllers = {
  signUpUser,
  getAllUsers,
};

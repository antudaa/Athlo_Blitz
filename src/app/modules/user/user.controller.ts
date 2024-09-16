import { RequestHandler } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, body } = req.body;

  const result = await UserService.createAdminIntoDB(password, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
})

const createClient: RequestHandler = catchAsync(async (req, res) => {
  const { password, body } = req.body;

  const result = await UserService.createClientIntoDB(password, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration succesfully',
    data: result,
  });
})

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data retrieved successfully.",
    data: result,
  });
});

const getUserFullData: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserWithFullData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data retrieved successfully.",
    data: result,
  });
});

const blockUserBySuperAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.blockUserBySuperAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User has been blocked successfully.",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createClient,
  getAllUsers,
  getUserFullData,
  blockUserBySuperAdmin,
};
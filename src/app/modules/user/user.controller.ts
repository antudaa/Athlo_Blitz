import { RequestHandler } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const {userInfo} = req.body;
    const result = await UserService.createUserIntoDB(userInfo);
    console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully.',
        data: result,
    })
});

export const UserControllers = {
    createUser,
}
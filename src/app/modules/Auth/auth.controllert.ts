import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";


const loginUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully.',
        token: result.accessToken,
        data: result.user,
    })
});


export const AuthControllers = {
    loginUser,
};
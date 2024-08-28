import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ClientServices } from "./client.service";

const getAllClient: RequestHandler = catchAsync(async (req, res) => {
    const result = await ClientServices.getAllClientFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data retrieved successfully.",
        data: result,
    });
});

const getClientByID: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClientServices.getClientByID(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User data retrieved successfully.",
        data: result,
    });
});

const blockClientByID: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClientServices.blockClientByID(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User has been blocked successfully.",
        data: result,
    });
});

const deleteClientByID: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClientServices.deleteClientByID(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User has been deleted successfully.",
        data: result,
    });
});

const updateClientByID: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ClientServices.updateClientInfo(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data updated successfully.",
        data: result,
    });
});

export const ClientControllers = {
    getAllClient,
    getClientByID,
    blockClientByID,
    deleteClientByID,
    updateClientByID,
};
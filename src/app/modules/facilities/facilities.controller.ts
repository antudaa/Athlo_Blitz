import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facilities.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import mongoose from "mongoose";

const createFacility: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const result = await FacilityService.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

const updateFacility: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { id } = req.params;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const result = await FacilityService.updateFacility(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = req.params;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const result = await FacilityService.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility deleted successfully",
    data: result,
  });
});

const getAllFacility: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilityFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const getFaciltyByID: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await FacilityService.getFacilityByID(objectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
})

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getFaciltyByID,
};

import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facilities.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../Errors/AppError";

const createFacility: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const facilityInfo = req.body;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const result = await FacilityService.createFacilityIntoDB(facilityInfo);

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
  const facilityInfo = req.body;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const result = await FacilityService.updateFacility(id, facilityInfo);

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
  console.log(req.cookies);
  const result = await FacilityService.getAllFacilityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};

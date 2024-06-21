import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facilities.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createFacility: RequestHandler = catchAsync(async (req, res) => {
    const facilityInfo = req.body;
    const result = await FacilityService.createFacilityIntoDB(facilityInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility added successfully',
        data: result,
    });
});

const updateFacility: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const facilityInfo = req.body;
    const result = await FacilityService.updateFacility(id, facilityInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility updated successfully',
        data: result,
    });
});

const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityService.deleteFacilityFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility deleted successfully',
        data: result,
    })
});

const getAllFacility: RequestHandler = catchAsync(async (req, res) => {
    const result = await FacilityService.getAllFacilityFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facilities retrieved successfully',
        data: result,
    });
});


export const FacilityControllers = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacility
}
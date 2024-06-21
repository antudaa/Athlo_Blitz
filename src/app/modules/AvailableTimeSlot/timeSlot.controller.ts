import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TimeSlotService } from "./timeSlot.service";


const createTimeSlot = catchAsync(async (req, res) => {
    const result = await TimeSlotService.createTimeSlotIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Time slot created successfully.',
        data: result,
    })
});

export const TimeSlotControllers = {
    createTimeSlot,
}
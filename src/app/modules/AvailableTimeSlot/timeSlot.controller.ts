import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TimeSlotService } from "./timeSlot.service";

const getAvailableTimeSlot = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await TimeSlotService.getAvailableTimeSlot(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

export const TimeSlotControllers = {
  getAvailableTimeSlot,
};

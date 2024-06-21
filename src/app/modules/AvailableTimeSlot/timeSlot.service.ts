import { TTimeSlot } from "./timeSlot.interface";
import { TimeSlot } from "./timeSlot.model";


const createTimeSlotIntoDB = async (payload: TTimeSlot) => {
    const result = await TimeSlot.create(payload);
    return result;
};

export const TimeSlotService = {
    createTimeSlotIntoDB,
}
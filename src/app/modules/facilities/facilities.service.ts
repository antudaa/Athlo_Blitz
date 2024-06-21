import { IFacility } from "./facilities.interface";
import { Facility } from "./facilities.model";


const createFacilityIntoDB = async (payload: IFacility) => {
    const newFacility = await Facility.create(payload);
    return newFacility;
};

const updateFacility = async (id: string, payload: Partial<IFacility>) => {
    const result = await Facility.findByIdAndUpdate(id, payload,
        { new: true }
    );
    return result;
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

const getAllFacilityFromDB = async () => {
    const result = await Facility.find();
    return result;
}

export const FacilityService = {
    createFacilityIntoDB,
    updateFacility,
    deleteFacilityFromDB,
    getAllFacilityFromDB,
};
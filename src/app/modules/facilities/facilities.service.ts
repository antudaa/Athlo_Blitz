import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { TFacility } from "./facilities.interface";
import { Facility } from "./facilities.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { facilitySearchableFields } from "./facility.Constant";
import { Types } from "mongoose";

const createFacilityIntoDB = async (payload: TFacility) => {
  const newFacility = await Facility.create(payload);
  return newFacility;
};

const updateFacility = async (id: string, payload: Partial<TFacility>) => {
  console.log(payload)
  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
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

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(facilitySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [facilities, totalCount] = await Promise.all([
    facilityQuery.modelQuery.populate("user"),
    facilityQuery.getTotalCount(),
  ]);

  const result = { total: totalCount, data: facilities };
  return result;
};

const getFacilityByID = async (id: Types.ObjectId) => {

  if (await Facility.isFacilityDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility is deleted!');
  }
  const result = Facility.findById(id)
    .populate('user');

  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacility,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
  getFacilityByID,
};

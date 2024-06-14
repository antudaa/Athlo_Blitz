import mongoose from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentID } from "./user.utils";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {

    try {

        // Create New Student [Transion -2]
        const newStudent = await User.create(payload);

        return newStudent;

    } catch (error: any) {
        throw new Error(error);
    }

};


export const UserService = {
    createUserIntoDB,
};
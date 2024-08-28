import mongoose, { Types } from "mongoose";
import config from "../../config";
import { TAdmin } from "../Admin/admin.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Admin } from "../Admin/admin.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";
import { TClient } from "../Client/client.interface";
import { Client } from "../Client/client.model";

const createAdminIntoDB = async (password: string, payload: TAdmin) => {

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  userData.email = payload.email;
  userData.onModel = 'Admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!');
    }

    payload.user = new Types.ObjectId(newUser[0]?._id);

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin!');
    }

    // const newUser
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  }
  catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createClientIntoDB = async (password: string, payload: TClient) => {

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'user';
  userData.email = payload.email;
  userData.onModel = 'Client';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!');
    }

    payload.user = new Types.ObjectId(newUser[0]?._id);

    const newClient = await Client.create([payload], { session });

    if (!newClient.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin!');
    }

    // const newUser
    await session.commitTransaction();
    await session.endSession();

    return newClient;
  }
  catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

};

const getAllUserFromDB = async () => {
  const users = await User.find();
  return users;
};

export const UserService = {
  createAdminIntoDB,
  createClientIntoDB,
  getAllUserFromDB,
};

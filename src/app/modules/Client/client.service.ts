import mongoose, { Types } from "mongoose";
import { Client } from "./client.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TClient } from "./client.interface";

const getAllClientFromDB = async () => {
  const result = await Client.find().populate('user');
  return result;
};

const getClientByID = async (id: string) => {
  const result = await Client.findById(id).populate('user');
  return result;
};

const blockClientByID = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    const client = await Client.findById(id).populate('user').session(session);

    if (!client) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User not exists')
    }

    if (await User.isUserBlocked(client?.user?._id)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User  is already blocked!');
    }

    const result = await User.blockUserByID(client.user._id);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to block user!');
    }

    await session.commitTransaction();
    await session.endSession();
  }
  catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const deleteClientByID = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    const client = await Client.findById(id).populate('user').session(session);

    if (!client) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin not exists')
    }

    if (await User.isUserDeleted(client?.user?._id)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User  is already deleted!');
    }

    const result = await User.deleteUserByID(client.user._id);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
    }

    await session.commitTransaction();
    await session.endSession();
  }
  catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateClientInfo = async (id: string, payload: Partial<TClient>) => {

  if (await User.isUserExistsByID(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not exists!');
  }

  const { address, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData
  };

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`address.${key}`] = value;
    }
  }

  const result = await Client.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    { new: true, runValidators: true }
  );

  return result;
};

export const ClientServices = {
  getAllClientFromDB,
  getClientByID,
  blockClientByID,
  deleteClientByID,
  updateClientInfo,
};
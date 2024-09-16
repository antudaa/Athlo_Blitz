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
import QueryBuilder from "../../builder/QueryBuilder";

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

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  try {
    // Create query builder instance for User model
    const userQuery = new QueryBuilder(User.find(), query)
      .sort()
      .paginate()
      .fields();

    // Fetch both clients and admins with user data populated
    const [clients, admins] = await Promise.all([
      Client.find().populate('user'),
      Admin.find().populate('user'),
    ]);

    // Get the total count of users from the query
    const totalCount = await userQuery.getTotalCount();

    const combinedUsers = [...clients, ...admins];

    return {
      total: totalCount, // If you want to use the actual total count from the query
      data: combinedUsers, // Combined users (clients and admins)
    };
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch users');
  }
};


const getUserWithFullData = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Try to find an admin user
    const admin = await Admin.findOne({ user: id }, null, { session })
      .populate('user');

    if (admin) {
      await session.commitTransaction();
      return admin;
    }

    // If admin is not found, try to find a client user
    const client = await Client.findOne({ user: id }, null, { session })
      .populate('user');

    await session.commitTransaction();
    return client;

  } catch (err: any) {
    await session.abortTransaction();
    throw err; // Re-throw the original error

  } finally {
    session.endSession(); // Ensure session is always ended
  }
};

const blockUserBySuperAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      status: 'blocked'
    },
    { new: true },
  );

  return result;
}

export const UserService = {
  createAdminIntoDB,
  createClientIntoDB,
  getAllUserFromDB,
  getUserWithFullData,
  blockUserBySuperAdmin
};

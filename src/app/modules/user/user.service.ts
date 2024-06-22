import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const newuser = await User.create(payload);
  return newuser;
};

const getAllUserFromDB = async () => {
  const users = await User.find();
  return users;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
};

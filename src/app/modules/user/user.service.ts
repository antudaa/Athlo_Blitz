import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    
    const newuser = await User.create(payload);

    return newuser;

};


export const UserService = {
    createUserIntoDB,
};
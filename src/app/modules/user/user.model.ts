import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next();
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email });
};

userSchema.statics.isUserDeleted = async function (email: string) {
    return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
};


export const User = model<IUser, UserModel>('User', userSchema);
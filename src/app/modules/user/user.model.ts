import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const userSchema = new Schema<TUser>(
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
            unique: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);


userSchema.pre('save', async function (next) {
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});


userSchema.post('save', function (doc, next) {
    doc.password = "";
    next();
});


export const User = model<TUser>('User', userSchema);
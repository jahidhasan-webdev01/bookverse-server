import bcrypt from "bcrypt";
import { User } from "../user/user.model";
import { BcryptHandler } from "../../utils/bcryptHandler";

const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await BcryptHandler.hashPassword(payload.password);

    const user = await User.create({
        ...payload,
        password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
};

export const AuthService = {
    registerUser,
};
import bcrypt from "bcrypt";
import { User } from "../user/user.model";
import { BcryptHandler } from "../../utils/bcryptHandler";
import AppError from "../../errors/AppError";
import { JwtHandler } from "../../utils/jwtHandler";

const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
        throw new AppError(409, "User already exists");
    }

    const hashedPassword = await BcryptHandler.hashPassword(payload.password);

    const user = await User.create({
        ...payload,
        password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
};

const loginUser = async (payload: {
    email: string;
    password: string;
}) => {
    // Check user exists
    const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw new AppError(401, "Invalid email or password");
    }

    // Compare password
    const isPasswordMatched = await BcryptHandler.comparePassword(
        payload.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError(401, "Invalid email or password");
    }

    // Create JWT
    const accessToken = JwtHandler.createToken({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();

    return {
        accessToken,
        user: userWithoutPassword,
    };
};


export const AuthService = {
    registerUser,
    loginUser
};
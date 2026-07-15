import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export const BcryptHandler = {
    hashPassword,
    comparePassword,
};
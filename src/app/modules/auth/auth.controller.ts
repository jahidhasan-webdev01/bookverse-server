import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);


  res.cookie("token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });


  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
    },
  });
});

const logoutUser = catchAsync(async (req, res) => {

  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logout successful"
  });

});

const getCurrentUser = catchAsync(
  async (req: Request, res: Response) => {

    const user = await AuthService.getCurrentUser(
      req.user.userId
    );


    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });

  }
);

export const AuthController = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
};
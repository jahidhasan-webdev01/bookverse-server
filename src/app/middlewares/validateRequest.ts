import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues,
            });
        }
    };
};

export default validateRequest;
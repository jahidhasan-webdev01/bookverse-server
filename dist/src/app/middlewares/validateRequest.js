"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues,
            });
        }
    };
};
exports.default = validateRequest;

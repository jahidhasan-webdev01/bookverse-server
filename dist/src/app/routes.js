"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./modules/auth/auth.route");
const book_route_1 = require("./modules/book/book.route");
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.AuthRoutes);
router.use("/books", book_route_1.BookRoutes);
exports.default = router;

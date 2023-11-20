"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expense = exports.userCred = void 0;
const zod_1 = require("zod");
exports.userCred = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }).max(25),
    password: zod_1.z.string().min(5).max(20)
});
exports.expense = zod_1.z.object({
    title: zod_1.z.string().min(5).max(20),
    description: zod_1.z.string().min(5).max(30),
    amount: zod_1.z.number(),
    type: zod_1.z.string().min(2).max(10),
});

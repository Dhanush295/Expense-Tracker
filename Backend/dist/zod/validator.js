"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expense = exports.userCred = void 0;
const zod_1 = require("zod");
exports.userCred = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }).max(25),
    password: zod_1.z.string().min(5).max(20)
});
exports.expense = zod_1.z.object({
    title: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(50),
    description: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(50),
    amount: zod_1.z.number().int(),
    type: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(50),
    date: zod_1.z.string().datetime(),
    category: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(55),
});

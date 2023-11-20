"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const hash_1 = require("../middlewear/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middlewear/auth");
const validator_1 = require("../zod/validator");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedUser = validator_1.userCred.safeParse(req.body);
        if (!parsedUser.success || !parsedUser.data.email || !parsedUser.data.password) {
            return res.status(400).json({ message: "Email and Password Required!" });
        }
        const userDetails = parsedUser.data;
        const userexist = yield prisma.user.findFirst({
            where: {
                email: userDetails.email
            }
        });
        if (userexist) {
            return res.status(400).json({ message: "email Already exist" });
        }
        const hashedPassword = (0, hash_1.hashPassword)(userDetails.password);
        const newUser = yield prisma.user.create({
            data: {
                email: userDetails.email,
                password: hashedPassword
            }
        });
        return res.status(200).json({ message: "User created successfully!", user: { newUser } });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedUser = validator_1.userCred.safeParse(req.body);
        if (!parsedUser.success || !parsedUser.data.email || !parsedUser.data.password) {
            return res.status(400).json({ message: "Email and Password Required!" });
        }
        const userdetails = parsedUser.data;
        const userexist = yield prisma.user.findFirst({
            where: {
                email: userdetails.email
            }
        });
        if (!userexist) {
            return res.status(400).json({ message: "User Not Found!" });
        }
        const isPasswordMatch = yield (0, hash_1.comparePasswords)(userdetails.password, userexist.password);
        if (isPasswordMatch) {
            const token = jsonwebtoken_1.default.sign({ id: userexist.id }, auth_1.SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Logged In Successfully!", token: token });
        }
        else {
            return res.status(401).json({ message: "Authentication Failed" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;

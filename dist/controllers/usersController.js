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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.postUser = postUser;
const usersService_1 = require("../services/usersService");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, usersService_1.getAllUsers)();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    });
}
function postUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const newUser = yield (0, usersService_1.createUser)(user);
            res.status(201).json(newUser);
        }
        catch (error) {
            const err = error;
            const appError = new Error(err.message);
            if (err.message === "Invalid User data") {
                appError.status = 400;
            }
            else if (err.message.includes("already exists")) {
                appError.status = 409;
            }
            next(appError);
        }
    });
}

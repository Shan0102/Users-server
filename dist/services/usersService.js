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
exports.lastUserId = void 0;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.setLastId = setLastId;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const USERS_FILE_PATH = path_1.default.join(__dirname, "..", "..", "data", "users.json");
exports.lastUserId = 0;
function readUsersFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.default.promises.readFile(USERS_FILE_PATH, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            throw new Error(error instanceof SyntaxError ? "Invalid JSON data" : "Failed to read users data");
        }
    });
}
function writeUsersFile(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.writeFile(USERS_FILE_PATH, data, "utf-8");
        }
        catch (error) {
            throw new Error("Failed to write users data");
        }
    });
}
function setLastId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield readUsersFile();
            exports.lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
        }
        catch (error) {
            throw error;
        }
    });
}
function validateUser(user) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.name || !user.email || !user.username)
        return false;
    return (typeof user.username === "string" &&
        user.username.trim() !== "" &&
        typeof user.name === "string" &&
        user.name.trim() !== "" &&
        typeof user.email === "string" &&
        user.email.trim() !== "" &&
        emailRegex.test(user.email));
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readUsersFile();
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validateUser(user)) {
            throw new Error("Invalid User data");
        }
        const users = yield readUsersFile();
        if (users.some((u) => u.username === user.username)) {
            throw new Error("Username already exists");
        }
        if (users.some((u) => u.email === user.email)) {
            throw new Error("Email already exists");
        }
        const newUser = {
            id: ++exports.lastUserId,
            name: user.name,
            username: user.username,
            email: user.email,
        };
        users.push(newUser);
        const usersString = JSON.stringify(users);
        yield writeUsersFile(usersString);
        return newUser;
    });
}

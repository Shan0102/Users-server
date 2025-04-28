"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
const errorHandlers_1 = require("./utils/errorHandlers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", usersRouter_1.default);
app.use(errorHandlers_1.notFoundHandler);
app.use(errorHandlers_1.errorHandler);
exports.default = app;

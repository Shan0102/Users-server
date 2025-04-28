"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
function errorHandler(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || "Server Error";
    console.error(`[${new Date().toISOString()}] Error: ${message}`);
    res.status(status).json({ Error: message });
}
function notFoundHandler(req, res) {
    res.status(404).json({ Error: "Not Found" });
}

import { Request, Response, NextFunction } from "express";
import { AppError } from "../interfaces/users";

function errorHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || "Server Error";

    console.error(`[${new Date().toISOString()}] Error: ${message}`);

    res.status(status).json({ Error: message });
}

function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ Error: "Not Found" });
}

export { errorHandler, notFoundHandler };

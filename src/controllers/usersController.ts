import { AppError, PostUser } from "../interfaces/users";
import { createUser, getAllUsers } from "../services/usersService";
import { Request, Response, NextFunction } from "express";

async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function postUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user: PostUser = req.body;
        const newUser = await createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        const err = error as Error;
        const appError: AppError = new Error(err.message);

        if (err.message === "Invalid User data") {
            appError.status = 400;
        } else if (err.message.includes("already exists")) {
            appError.status = 409;
        }

        next(appError);
    }
}

export { getUsers, postUser };

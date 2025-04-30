import path from "path";
import { Request, Response, NextFunction } from "express";

const INDEX_PATH = path.join(__dirname, "..", "..", "views", "index.html");
const USERS_PATH = path.join(__dirname, "..", "..", "views", "users.html");
const CREATE_USER_PATH = path.join(__dirname, "..", "..", "views", "createUser.html");

function renderHomePage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile(INDEX_PATH);
    } catch (error) {
        next(error);
    }
}

function renderUsersPage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile(USERS_PATH);
    } catch (error) {
        next(error);
    }
}

function renderCreateUserPage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile(CREATE_USER_PATH);
    } catch (error) {
        next(error);
    }
}

export { renderHomePage, renderUsersPage, renderCreateUserPage };

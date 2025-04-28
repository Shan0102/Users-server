import path from "path";
import fs from "fs";
import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface PostUser {
    name: string;
    username: string;
    email: string;
}

interface AppError extends Error {
    status?: number;
}

const USERS_FILE_PATH = path.join(__dirname, "..", "data", "users.json");
const PORT = 3000;

let lastId = 0;

async function readUsersFile(): Promise<User[]> {
    try {
        const data = await fs.promises.readFile(USERS_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        throw new Error(
            error instanceof SyntaxError ? "Invalid JSON data" : "Failed to read users data"
        );
    }
}

async function writeUsersFile(data: string): Promise<void> {
    try {
        await fs.promises.writeFile(USERS_FILE_PATH, data, "utf-8");
    } catch (error) {
        throw new Error("Failed to write users data");
    }
}

async function setLastId(): Promise<void> {
    try {
        const users = await readUsersFile();
        lastId = users.length > 0 ? users[users.length - 1].id : 0;
    } catch (error) {
        throw error;
    }
}

function validateUser(user: PostUser): user is PostUser {
    if (!user.name || !user.email || !user.username) return false;
    return (
        typeof user.username === "string" &&
        user.username.trim() !== "" &&
        typeof user.name === "string" &&
        user.name.trim() !== "" &&
        typeof user.email === "string" &&
        user.email.trim() !== ""
    );
}
const app: Express = express();
app.use(cors());
app.use(express.json());

function errorHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || "Server Error";

    console.error(`[${new Date().toISOString()}] Error: ${message}`);

    res.status(status).json({ Error: message });
}

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await readUsersFile();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const user: PostUser = req.body;

    try {
        if (!validateUser(user)) {
            const error: AppError = new Error("Invalid User data");
            error.status = 400;
            throw error;
        }

        const parsedUsers = await readUsersFile();

        if (parsedUsers.some((u) => u.username === user.username)) {
            const error: AppError = new Error("Username already exists");
            error.status = 409;
            throw error;
        }
        if (parsedUsers.some((u) => u.email === user.email)) {
            const error: AppError = new Error("Email already exists");
            error.status = 409;
            throw error;
        }

        const newUser: User = {
            id: ++lastId,
            name: user.name,
            username: user.username,
            email: user.email,
        };

        parsedUsers.push(newUser);

        const usersString = JSON.stringify(parsedUsers);
        await writeUsersFile(usersString);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ Error: "Not Found" });
});

app.use(errorHandler);

async function startServer() {
    try {
        await setLastId();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
            console.log(`last User ID initialized to ${lastId}`);
        });
    } catch (error) {
        console.error("Failed to initialize server", error);
        process.exit(1);
    }
}

startServer();

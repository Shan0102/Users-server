import path from "path";
import fs from "fs";
import { User, PostUser } from "../interfaces/users";

const USERS_FILE_PATH = path.join(__dirname, "..", "..", "data", "users.json");
export let lastUserId = 0;

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
        lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    } catch (error) {
        throw error;
    }
}

function validateUser(user: PostUser): user is PostUser {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.name || !user.email || !user.username) return false;
    return (
        typeof user.username === "string" &&
        user.username.trim() !== "" &&
        typeof user.name === "string" &&
        user.name.trim() !== "" &&
        typeof user.email === "string" &&
        user.email.trim() !== "" &&
        emailRegex.test(user.email)
    );
}

async function getAllUsers() {
    return await readUsersFile();
}

async function createUser(user: PostUser) {
    if (!validateUser(user)) {
        throw new Error("Invalid User data");
    }

    const users = await readUsersFile();

    if (users.some((u) => u.username === user.username)) {
        throw new Error("Username already exists");
    }
    if (users.some((u) => u.email === user.email)) {
        throw new Error("Email already exists");
    }

    const newUser: User = {
        id: ++lastUserId,
        name: user.name,
        username: user.username,
        email: user.email,
    };

    users.push(newUser);

    const usersString = JSON.stringify(users);
    await writeUsersFile(usersString);

    return newUser;
}

export { getAllUsers, createUser, setLastId };

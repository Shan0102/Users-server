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

export { User, PostUser, AppError };

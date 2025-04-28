import app from "./app";
import { lastUserId, setLastId } from "./services/usersService";

const PORT = process.env.PORT || 3000;

async function createServer() {
    try {
        await setLastId();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
            console.log(`Last User ID initialized ${lastUserId}`);
        });
    } catch (error) {
        console.error("Failed to initialize server", error);
        process.exit(1);
    }
}

createServer();

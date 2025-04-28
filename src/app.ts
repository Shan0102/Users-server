import express, { Express } from "express";
import cors from "cors";
import usersRouter from "./routers/usersRouter";
import { errorHandler, notFoundHandler } from "./utils/errorHandlers";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

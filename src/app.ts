import path from "path";
import express, { Express } from "express";
import usersRouter from "./routers/usersRouter";
import indexRouter from "./routers/indexRouter";
import { errorHandler, notFoundHandler } from "./utils/errorHandlers";

const app: Express = express();

const VIEWS_PATH = path.join(__dirname, "..", "views");
const PUBLIC_PATH = path.join(__dirname, "..", "public");

app.set("views", VIEWS_PATH);

app.use(express.static(PUBLIC_PATH));

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

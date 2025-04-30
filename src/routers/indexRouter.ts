import express from "express";
import {
    renderHomePage,
    renderUsersPage,
    renderCreateUserPage,
} from "../controllers/indexController";

const router = express.Router();

router.get("/", renderHomePage);
router.get("/users", renderUsersPage);
router.get("/users/new", renderCreateUserPage);

export default router;

import { Router } from "express";
import { UserController } from "../controller/user-controller.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/login', userController.login.bind(userController));

userRoutes.post("/create", userController.create.bind(userController));

userRoutes.post("/logout", userController.logout.bind(userController));

export { userRoutes };
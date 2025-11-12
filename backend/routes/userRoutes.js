import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import { updateUserLocation } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post("/update-location", isAuth, updateUserLocation);

export default userRouter;

import express from "express";
import { createUser, loginUser, logout, getAllUsers, getCurrnetUSerProfile, updateCurrentUSer, deleteUSer, getUSerById, UpdateUserById } from "../controllers/userControllers.js";
import { authmiddleware, authrizeAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router()

router.route("/").post(createUser).get(authmiddleware, authrizeAdmin, getAllUsers)
router.post("/login", loginUser)
router.post("/logout", logout)
router.route("/profile")
    .post(authmiddleware, getCurrnetUSerProfile)
    .put(authmiddleware, updateCurrentUSer)
router.route("/:id").delete(authrizeAdmin, authmiddleware, deleteUSer)
    .get(authmiddleware, authrizeAdmin, getUSerById)
    .put(authmiddleware, authrizeAdmin, UpdateUserById)
export default router
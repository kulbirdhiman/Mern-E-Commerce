import express from "express";
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js'
import { createOder, getallOder, countTotal, totalSales, totalSalesByDay, oderFindById, payOrder, markOrderAsDiliverd } from '../controllers/oderControllers.js'
const router = express.Router();

router.route("/").post(authenticate, createOder).get(authenticate, authorizeAdmin, getallOder)

router.route("/mine").get(authenticate, getUsersOder)
router.route("/total-count").get(countTotal)
router.route("/total-sales").get(authorizeAdmin, totalSales);
router.route("/totaldaysales").get(totalSalesByDay)
router.route("/:id").get(oderFindById);
router.route("/:id/pay").put(authenticate, payOrder)
router.route("/:id/deliver").put(authenticate, markOrderAsDiliverd)
export default router;
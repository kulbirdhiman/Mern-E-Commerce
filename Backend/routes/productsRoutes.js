import express from "express";
import formidable from "express-formidable";
import { authmiddleware, authrizeAdmin, } from '../middlewares/authmiddleware.js'
import CheckId from "../middlewares/checkID.js";
import { addProduct, updateProduct, delteproducts, fetchProducts, fecthProductById, fecthAllProducts, addProjuctReviews, topProducts, newProducts } from '../controllers/productsControllers.js'
const router = express.Router();

router.route("/")
    .get(fetchProducts).post(authmiddleware, authrizeAdmin, formidable(), addProduct)
router.route("/:id")
    .get(fecthProductById).put(authmiddleware, authrizeAdmin, formidable(), updateProduct)
    .delete(authmiddleware, authrizeAdmin, delteproducts)
router.route("/:id/reviews").post(authmiddleware, CheckId, addProjuctReviews)
router.route("/top").get(topProducts)
router.route("/new").get(newProducts)
router.route("/allproducts").get(fecthAllProducts);
export default router
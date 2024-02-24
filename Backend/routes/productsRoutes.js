import express from "express";
import formidable from "express-formidable";
import { authmiddleware, authrizeAdmin, } from '../middlewares/authmiddleware.js'
import CheckId from "../middlewares/checkID.js";
import { addProduct, updateProduct, delteproducts, fetchProducts, fecthProductById, fecthAllProducts, addProjuctReviews, topProducts, newProducts } from '../controllers/productsControllers.js'
const Router = express.Router;

Router.route("/")
    .get(fetchProducts).post(authmiddleware, authrizeAdmin, formidable(), addProduct)
Router.route("/:id")
    .get(fecthProductById).put(authmiddleware, authrizeAdmin, formidable(), updateProduct)
    .delete(authmiddleware, authrizeAdmin, delteproducts)
Router.route("/:id/reviews").post(authmiddleware, CheckId, addProjuctReviews)
Router.route("/top").get(topProducts)
Router.route("/new").get(newProducts)
Router.route("/allproducts").get(fecthAllProducts);
export default Router
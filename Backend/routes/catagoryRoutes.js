import express from 'express'
import { authmiddleware, authrizeAdmin } from '../middlewares/authmiddleware.js';
import { createCategroy, readCatagory, updateCatagory, listCatagory, deleteCatagory } from '../controllers/catagoryControllers.js'
const Router = express.Router();

Router.route('/').post(authmiddleware, authrizeAdmin, createCategroy);
Router.route('/:id').put(authmiddleware, authrizeAdmin, updateCatagory);
Router.route("/:id").delete(authmiddleware, authrizeAdmin, deleteCatagory)
Router.route("/categories").get(listCatagory)
Router.route("/:id").get(readCatagory)

export default Router
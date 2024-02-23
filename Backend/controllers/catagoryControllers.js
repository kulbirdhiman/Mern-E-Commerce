import expressAsyncHandler from "express-async-handler";
import catagory from '../models/CatagoryModel.js'
const createCategroy = expressAsyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(404).json("name is required");
    };
    const isExits = await catagory.findOne({ name });
    if (isExits) {
        res.status(404).json("this catagory is aleardy exits")
    }
    else {
        try {
            const newCatagory = await catagory.create({ name });
            res.status(200).json(newCatagory)
        } catch (error) {
            res.status(404).json(error)
        }
    }
})
const updateCatagory = expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await catagory.findOne({ _id: id });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
const deleteCatagory = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await catagory.findByIdAndRemove(id);
        res.send(deleted)

    } catch (error) {
        res.send("something wrong")
    }


})
const listCatagory = expressAsyncHandler(async (req, res) => {
    try {
        const all = await catagory.find({})
        res.json(all)
    } catch (error) {
        res.status(404).json(error)
    }
})
const readCatagory = expressAsyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const findcatagory = await catagory.findById(id)
        res.send(findcatagory)
    } catch (error) {
        res.status(404).json(error)
    }
})

export { createCategroy, readCatagory, updateCatagory, listCatagory, deleteCatagory };
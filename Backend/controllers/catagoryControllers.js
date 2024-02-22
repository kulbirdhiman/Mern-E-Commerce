import expressAsyncHandler from "express-async-handler";
import catagory from '../models/CatagoryModel.js'
const createCategroy = expressAsyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(404).json("name is required");
    };
    const isExits = await catagory.findOne(name);
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
        const catagoryId = req.params.id;
        const { name } = req.body()
        const catagory = catagory.findById(catagoryId);
        if (!catagory) {
            res.status(404).json("cant find ")
        }
        else {
            const updatedCatagory = await catagory.updateOne({ _id: catagoryId }, { $set: { name } })
            res.json(updatedCatagory)
        }
    } catch (error) {
        res.status(404).json(error)
    }
})
const deleteCatagory = expressAsyncHandler(async (req, res) => {
    const catagoryId = req.params.id;
    try {
        const deleted = await catagory.deleteOne(catagoryId)


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
    } catch (error) {
        res.status(404).json(error)
    }
})

export { createCategroy, readCatagory, updateCatagory, listCatagory, deleteCatagory };
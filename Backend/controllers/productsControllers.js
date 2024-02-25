import expressAsyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

const addProduct = expressAsyncHandler(async (req, res) => {
    try {
        const { name, brand, category, price, image, description, quantity } = req.fields
        switch (true) {
            case !name:
                res.json({ "error": "name is required" })
            case !brand:
                res.json({ "error": "brand is required" })
            case !category:
                res.json({ "error": "catagory is required" })
            case !price:
                res.json({ "error": "price is required" })
            case !image:
                res.json({ "error": "image is required" })
            case !description:
                res.json({ "error": "desctpion is required" })
            case !quantity:
                res.json({ "error": "quatity  is required" })
        }
        const product = new Product({ ...req.fields });
        await product.save()
        res.json(product)
    } catch (error) {
        res.send(error)
    }
})


const updateProduct = expressAsyncHandler(async (req, res) => {
    try {
        const { name, brand, catagory, price, image, description, quantity } = req.fields
        switch (true) {
            case !name:
                res.json({ "error": "name is required" })
            case !brand:
                res.json({ "error": "brand is required" })
            case !catagory:
                res.json({ "error": "catagory is required" })
            case !price:
                res.json({ "error": "price is required" })
            case !image:
                res.json({ "error": "image is required" })
            case !description:
                res.json({ "error": "desctpion is required" })
            case !quantity:
                res.json({ "error": "quatity  is required" })
        }
        let product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        res.json(product)
    } catch (error) {
        res.send(error)
    }
})
const delteproducts = expressAsyncHandler(async (req, res) => {
    try {
        const delterProduct = await Product.findByIdAndDelete(req.params.id)
        res.send(delterProduct)
    } catch (error) {
        res.status(404).json(error);
    }
})
const fetchProducts = expressAsyncHandler(async (req, res) => {
    try {
        const keybord = req.query.keybord ? { name: { $regex: req.query.keybord, $options: 'i' } } : {}
        console.log(keybord)
        const pageSize = 6
        const count = await Product.countDocuments({ ...keybord })
        const products = await Product.find({ ...keybord }).limit(keybord)
        res.json({
            products, page: 1, pages: Math.ceil(count / pageSize),
            hashMore: false
        })
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})
const fecthProductById = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        }
        else {
            res.status(404)
            throw new Error("Product not founded")
        }
    } catch (error) {
        res.status(404).json({ messge: "product not founded" })
    }
})
const fecthAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate("catagory").limit(12).sort({ createAt: -1 })
        req.json(products)
    } catch (error) {
        res.status(404)
        throw new Error("Error in getting all products")
    }
})
const addProjuctReviews = expressAsyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Product already reviewed");
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review added" });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});
const topProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}.sort({ rating: -1 })).limit(7)
        res.json(products)
    } catch (error) {
        res.status(404)
        throw new Error("Could not get the top products")
    }
})
const newProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(5);
        res.json(products)
    } catch (error) {
        res.status(404)
        throw new Error("Could not get the top products")
    }
})
export { addProduct, updateProduct, delteproducts, fetchProducts, fecthProductById, fecthAllProducts, addProjuctReviews, topProducts, newProducts }


import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import NodeCache from "node-cache";
import uploadImage from "../utils/uploadImage.js";

const cache = new NodeCache({ stdTTL: 5000 }); // Initialize NodeCache

// Add Product
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.body;
    const localimage = req.file.path;
    console.log(localimage);
    // Validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !brand:
        return res.status(400).json({ error: "Brand is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
    }
    const image = await uploadImage(localimage);
    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
    });
    console.log(product);
    await product.save();

    cache.del("products"); // Invalidate product cache
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Update Product Details
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.body;
    const localimage = req.file.path;
    console.log(localimage);
    
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !brand:
        return res.status(400).json({ error: "Brand is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
    }
    const image = await uploadImage(localimage);
    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
    });
    console.log(product);
    await product.save();

    cache.del("products"); // Invalidate product cache
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Remove Product
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    cache.del("products"); // Invalidate product cache
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: count > pageSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    let cachedProducts = cache.get("products");

    if (cachedProducts) {
      return res.json(cachedProducts); 
    }

    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    cache.set("products", products); 
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add Product Review
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ error: "Product already reviewed" });
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
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    let topProducts = cache.get("topProducts")
    if(topProducts){
      res.json(topProducts)
    }
    else{
      topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
      cache.set("topProducts",topProducts)
    }
    res.json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    let newProducts = cache.get("newProduct")
    if(newProducts){
      res.json(newProducts)
    }
    else{
      newProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
      cache.set("newProduct",products)
    }
    res.json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let filters = {};
    if (checked.length > 0) filters.category = checked;
    if (radio.length) filters.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};

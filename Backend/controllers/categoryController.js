import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 5000 }); // Cache for 5000 seconds

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await new Category({ name }).save();
    cache.del("category"); // Invalidate the cached category list
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    const updatedCategory = await category.save();
    
    cache.del("category"); // Invalidate the cached category list
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove Category
const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removedCategory = await Category.findByIdAndRemove(req.params.categoryId);
    
    if (!removedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    cache.del("category"); // Invalidate the cached category list
    res.json({ message: "Category removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List All Categories
const listCategory = asyncHandler(async (req, res) => {
  try {
    // Check if the category list is in the cache
    const cachedCategory = cache.get("category");

    if (cachedCategory) {
      return res.json(cachedCategory); // Serve from cache if available
    } else {
      const categories = await Category.find();
      cache.set("category", categories); // Cache the fetched categories
      return res.json(categories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read Single Category
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};

/** @format */

import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients } = req.body;
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      user: req.user.id,
    });
    await recipe.save();
    res.status(201).json({ message: "Recipe created", recipe });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating recipe", error: err.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).populate(
      "user",
      "username email"
    );
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

export const searchByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.body; // Array of ingredients
    const recipes = await Recipe.find({
      ingredients: { $all: ingredients.map((i) => new RegExp(i, "i")) },
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error searching", error: err.message });
  }
};

export const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe.likes.includes(req.user.id)) {
      recipe.likes.push(req.user.id);
      await recipe.save();
    }
    res.status(200).json({ message: "Recipe liked" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error liking recipe", error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: err.message });
  }
};

/** @format */

import express from "express";

import {
  createRecipe,
  getAllRecipes,
  searchByIngredients,
  likeRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createRecipe);
router.get("/", protect, getAllRecipes);
router.post("/search", searchByIngredients);
router.post("/like/:id", protect, likeRecipe);
router.delete("/:id", protect, deleteRecipe);

export default router;

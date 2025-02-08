import { Request, Response } from "express";
import FoodDatabase from "../database/foodDatabase";
import dishSchema from "../schemas/dishSchema";
import updateDishSchema from "../schemas/updateDishSchema";

export const getAllDishes = (req: Request, res: Response): void => {
  const {
    page = "1",
    limit = "10",
    sortBy = "name",
    order = "asc",
    diet,
    flavor,
    state,
  } = req.query;

  // Convert query parameters to appropriate types
  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);
  const sortOrder = order === "desc" ? -1 : 1;

  // Retrieve all dishes
  let dishes = FoodDatabase.getAllDishes();

  // Apply filtering
  if (diet) {
    dishes = dishes.filter(
      (dish) => dish.diet.toLowerCase() === (diet as string).toLowerCase()
    );
  }
  if (flavor) {
    dishes = dishes.filter(
      (dish) =>
        dish.flavor_profile.toLowerCase() === (flavor as string).toLowerCase()
    );
  }
  if (state) {
    dishes = dishes.filter(
      (dish) => dish.state.toLowerCase() === (state as string).toLowerCase()
    );
  }

  // Apply sorting
  dishes.sort((a, b) => {
    const fieldA = a[sortBy as keyof typeof a];
    const fieldB = b[sortBy as keyof typeof b];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortOrder * fieldA.localeCompare(fieldB);
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortOrder * (fieldA - fieldB);
    } else {
      return 0;
    }
  });

  // Apply pagination
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDishes = dishes.slice(startIndex, endIndex);

  // Prepare response with metadata
  const response = {
    page: pageNumber,
    limit: pageSize,
    total: dishes.length,
    results: paginatedDishes,
  };
  res.status(200).json(response);
};

export const getDishById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const dish = FoodDatabase.findDishById(id);
  if (!dish) {
    res.status(404).json({ message: "Dish not found" });
    return;
  }
  res.status(200).json(dish);
};

export const getDishesByIngredients = (req: Request, res: Response): void => {
  const { ingredients } = req.body;
  if (!Array.isArray(ingredients)) {
    res.status(400).json({ message: "Invalid ingredients format" });
    return;
  }
  const possibleDishes = FoodDatabase.findDishesByIngredients(ingredients);
  res.status(200).json(possibleDishes);
};

export const createDish = (req: Request, res: Response) => {
  const { error } = dishSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return;
  }
  const newDish = FoodDatabase.addDish(req.body);
  res.status(201).json(newDish);
};

export const updateDish = (req: Request, res: Response) => {
  const { error } = updateDishSchema.validate(
    { id: req.params.id, ...req.body },
    { abortEarly: false, allowUnknown: true }
  );
  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return;
  }
  const updatedDish = FoodDatabase.updateDish(req.params.id, req.body);
  if (!updatedDish) {
    res.status(404).json({ message: "Dish not found" });
    return;
  }
  res.json(updatedDish);
};

export const deleteDish = (req: Request, res: Response) => {
  const deleted = FoodDatabase.deleteDish(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Dish not found" });
    return;
  }
  res.json({ message: "Dish deleted successfully" });
};

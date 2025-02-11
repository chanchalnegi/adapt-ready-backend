import { Request, Response } from "express";
import FoodDatabase from "../database/foodDatabase";
import dishSchema from "../schemas/dishSchema";
import updateDishSchema from "../schemas/updateDishSchema";

/**
 * Used to fetch all dishes based on the pagination sorting and filtering
 * @param req
 * @param res
 */
export const getAllDishes = (req: Request, res: Response): void => {
  const {
    page = "1",
    limit = "10",
    sort_by = "name",
    order = "asc",
    ingredients,
    diet,
    flavor,
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
        dish.flavor_profile?.toLowerCase() === (flavor as string).toLowerCase()
    );
  }
  if (ingredients) {
    const availableIngredients = (ingredients as string)
      .split(",")
      .map((ing) => ing.trim().toLowerCase());

    dishes = dishes.filter((dish) => {
      const dishIngredients = dish.ingredients
        .toLowerCase()
        .split(",")
        .map((ing) => ing.trim());
      return availableIngredients.every((ingredient) =>
        dishIngredients.includes(ingredient)
      );
    });
  }

  // Calculate total number of pages
  const totalDishes = dishes.length;
  const totalPages = Math.ceil(totalDishes / pageSize);

  // Apply sorting
  dishes.sort((a, b) => {
    const fieldA = a[sort_by as keyof typeof a];
    const fieldB = b[sort_by as keyof typeof b];

    if (fieldA === undefined || fieldB === undefined) {
      console.warn(`Warning: ${sort_by} field not found in some dishes.`);
      return 0;
    }

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortOrder * fieldA.localeCompare(fieldB);
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortOrder * (fieldA - fieldB);
    } else {
      console.warn(
        `Mismatched types for sorting: ${typeof fieldA} vs ${typeof fieldB}`
      );
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
    totalDishes,
    totalPages,
    results: paginatedDishes,
  };
  res.status(200).json(response);
};

/**
 * get dish by id
 * @param req
 * @param res
 * @returns
 */
export const getDishById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const dish = FoodDatabase.findDishById(id);
  if (!dish) {
    res.status(404).json({ message: "Dish not found" });
    return;
  }
  res.status(200).json(dish);
};

/**
 * create a dish
 * @param req
 * @param res
 * @returns
 */
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

/**
 * update a dish
 * @param req
 * @param res
 * @returns
 */
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

/**
 * delete a dish
 * @param req
 * @param res
 * @returns
 */
export const deleteDish = (req: Request, res: Response) => {
  const deleted = FoodDatabase.deleteDish(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Dish not found" });
    return;
  }
  res.json({ message: "Dish deleted successfully" });
};

/**
 * search based on suggestion
 * @param req
 * @param res
 */
export const searchDishes = (req: Request, res: Response): void => {
  const { query = "" } = req.query;

  // Retrieve all dishes
  let dishes = FoodDatabase.getAllDishes();

  // Convert query to lowercase for case-insensitive search
  const searchQuery = (query as string).toLowerCase();

  // Apply filtering based on name, ingredients, or origin (state/region)
  dishes = dishes.filter((dish) => {
    const nameMatch = dish.name.toLowerCase().includes(searchQuery);
    const ingredientsMatch = dish.ingredients
      .toLowerCase()
      .split(",")
      .some((ing) => ing.trim().includes(searchQuery));
    const originMatch =
      dish.state?.toLowerCase().includes(searchQuery) ||
      dish.region?.toLowerCase().includes(searchQuery);

    return nameMatch || ingredientsMatch || originMatch;
  });

  // Prepare response
  res.status(200).json(dishes);
};

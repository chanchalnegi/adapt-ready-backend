import fs from "fs";
import path from "path";
import { Food } from "../models/foodModel";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const foodDataPath = path.join(__dirname, "../data/indian_food.json");

class FoodDatabase {
  private foods: Food[];

  constructor() {
    this.foods = this.loadData();
  }

  private loadData(): Food[] {
    const data = fs.readFileSync(foodDataPath, "utf-8");
    return JSON.parse(data);
  }

  private saveData(): void {
    fs.writeFileSync(
      foodDataPath,
      JSON.stringify(this.foods, null, 2),
      "utf-8"
    );
  }

  public getAllDishes(): Food[] {
    return this.foods;
  }

  public findDishById(id: string): Food | undefined {
    return this.foods.find((dish) => dish.id === id);
  }

  public findDishesByIngredients(availableIngredients: string[]): Food[] {
    return this.foods.filter((dish) => {
      const dishIngredients = dish.ingredients.toLowerCase().split(", ");
      return availableIngredients.every((ingredient) =>
        dishIngredients.includes(ingredient.toLowerCase())
      );
    });
  }

  public addDish(newDish: Omit<Food, "id">): Food {
    const dishWithId: Food = { id: uuidv4(), ...newDish };
    this.foods.push(dishWithId);
    this.saveData();
    return dishWithId;
  }

  public updateDish(
    id: string,
    updatedFields: Partial<Omit<Food, "id">>
  ): Food | null {
    const dishIndex = this.foods.findIndex((dish) => dish.id === id);
    if (dishIndex === -1) return null;

    this.foods[dishIndex] = { ...this.foods[dishIndex], ...updatedFields };
    this.saveData();
    return this.foods[dishIndex];
  }

  public deleteDish(id: string): boolean {
    const initialLength = this.foods.length;
    this.foods = this.foods.filter((dish) => dish.id !== id);
    if (this.foods.length === initialLength) return false;

    this.saveData();
    return true;
  }
}

export default new FoodDatabase();

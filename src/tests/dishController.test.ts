import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import * as dishesController from "../controllers/foodController";
import FoodDatabase from "../database/foodDatabase";

// Mock the FoodDatabase module
jest.mock("../database/foodDatabase", () => ({
  getAllDishes: jest.fn(),
  findDishById: jest.fn(),
  addDish: jest.fn(),
  updateDish: jest.fn(),
  deleteDish: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());

// Define routes to be tested
app.get("/dishes", dishesController.getAllDishes);
app.get("/dishes/search", dishesController.searchDishes);
app.get("/dishes/:id", dishesController.getDishById);
app.post("/dishes", dishesController.createDish);
app.put("/dishes/:id", dishesController.updateDish);
app.delete("/dishes/:id", dishesController.deleteDish);

describe("Dishes Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** GET all dishes */
  it("should return a paginated list of dishes", async () => {
    (FoodDatabase.getAllDishes as jest.Mock).mockReturnValue([
      {
        id: "1",
        name: "Pasta",
        ingredients: "Tomato, Garlic",
        diet: "Vegetarian",
      },
      {
        id: "2",
        name: "Chicken Curry",
        ingredients: "Chicken, Spices",
        diet: "Non-Vegetarian",
      },
    ]);

    const response = await request(app).get("/dishes?page=1&limit=1");
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBe(1);
    expect(response.body.totalDishes).toBe(2);
  });

  /** SEARCH dishes */
  it("should return dishes matching the search query", async () => {
    (FoodDatabase.getAllDishes as jest.Mock).mockReturnValue([
      {
        id: "1",
        name: "Pasta",
        ingredients: "Tomato, Garlic",
        region: "Italy",
      },
      {
        id: "2",
        name: "Chicken Curry",
        ingredients: "chicken, Spices",
        region: "India",
      },
    ]);

    const response = await request(app).get(
      "/dishes/search?query=chicken curry"
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Chicken Curry");
  });

  it("should return an empty array if no matches are found", async () => {
    (FoodDatabase.getAllDishes as jest.Mock).mockReturnValue([
      {
        id: "1",
        name: "Pasta",
        ingredients: "Tomato, Garlic",
        region: "Italy",
      },
    ]);

    const response = await request(app).get("/dishes/search?query=banana");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  /** GET dish by ID */
  it("should return a dish by ID", async () => {
    (FoodDatabase.findDishById as jest.Mock).mockReturnValue({
      id: "1",
      name: "Pasta",
      ingredients: "Tomato, Garlic",
    });

    const response = await request(app).get("/dishes/1");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Pasta");
  });

  it("should return 404 if dish not found", async () => {
    (FoodDatabase.findDishById as jest.Mock).mockReturnValue(null);

    const response = await request(app).get("/dishes/99");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Dish not found");
  });

  /** CREATE a new dish */
  it("should create a new dish", async () => {
    (FoodDatabase.addDish as jest.Mock).mockReturnValue({
      id: "f9633832-af21-4b97-b61b-bda7e6b2208u",
      name: "Maachs Jhol",
      ingredients: "Fish, potol, tomato, chillies, ginger, garlic",
      diet: "non vegetarian",
      prep_time: 10,
      cook_time: 40,
      flavor_profile: "spicy",
      course: "main course",
      state: "Assam",
      region: "North East",
    });

    const response = await request(app).post("/dishes").send({
      name: "Maachs Jhol",
      ingredients: "Fish, potol, tomato, chillies, ginger, garlic",
      diet: "non-vegetarian",
      prep_time: 10,
      cook_time: 40,
      flavor_profile: "spicy",
      course: "main course",
      state: "Assam",
      region: "North East",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Maachs Jhol");
  });

  it("should return 400 for invalid dish data", async () => {
    const invalidDish = { name: "", ingredients: "Cheese, Tomato" };

    const response = await request(app).post("/dishes").send(invalidDish);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  /** UPDATE a dish */
  it("should return 404 if deleting a non-existent dish", async () => {
    (FoodDatabase.deleteDish as jest.Mock).mockReturnValue(false);

    const response = await request(app).delete("/dishes/1");
    expect(response.status).toBe(404);
  });
});

it("should update an existing dish", async () => {
  (FoodDatabase.updateDish as jest.Mock).mockReturnValue({
    id: "1",
    name: "Updated Pasta",
    ingredients: "Tomato, Basil",
  });

  const response = await request(app).put("/dishes/1").send({
    name: "Updated Pasta",
    ingredients: "Tomato, Basil",
  });

  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Updated Pasta");
});

/** DELETE a dish */
it("should return 404 when updating a non-existent dish", async () => {
  (FoodDatabase.updateDish as jest.Mock).mockReturnValue(null);

  const response = await request(app)
    .put("/dishes/f9633832-af21-4b97-b61b-bda7e6b2208u")
    .send({
      name: "Non-existent Dish",
    });

  expect(response.status).toBe(404);
});

it("should delete a dish", async () => {
  (FoodDatabase.deleteDish as jest.Mock).mockReturnValue(true);

  const response = await request(app).delete("/dishes/1");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Dish deleted successfully");
});

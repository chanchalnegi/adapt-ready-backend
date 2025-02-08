import { Router } from "express";
import {
  createDish,
  deleteDish,
  getAllDishes,
  getDishById,
  getDishesByIngredients,
  updateDish,
} from "../controllers/foodController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/dishes", getAllDishes);
router.get("/dishes/:id", getDishById);
router.post("/find-by-ingredients", getDishesByIngredients);
router.post("/dishes", createDish);
router.put("/dishes/:id", updateDish);
router.delete("/dishes/:id", deleteDish);

export default router;

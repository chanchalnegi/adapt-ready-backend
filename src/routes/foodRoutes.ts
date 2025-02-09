import { Router } from "express";
import {
  createDish,
  deleteDish,
  getAllDishes,
  getDishById,
  searchDishes,
  updateDish,
} from "../controllers/foodController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/", getAllDishes);
router.get("/search", searchDishes);
router.get("/:id", getDishById);
router.post("/dishes", createDish);
router.put("/dishes/:id", updateDish);
router.delete("/:id", deleteDish);
export default router;

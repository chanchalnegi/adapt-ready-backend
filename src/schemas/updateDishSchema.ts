// src/schemas/updateDishSchema.ts
import Joi from "joi";

const updateDishSchema = Joi.object({
  id: Joi.string().required().messages({ "any.required": "ID is required" }),
  name: Joi.string(),
  ingredients: Joi.string(),
  diet: Joi.string().valid("vegetarian", "non-vegetarian"),
  prep_time: Joi.number().integer().min(0),
  cook_time: Joi.number().integer().min(0),
  flavor_profile: Joi.string(),
  course: Joi.string(),
  state: Joi.string().allow(null, ""),
  region: Joi.string().allow(null, ""),
})
  .min(2)
  .messages({
    "object.min": "At least one field (other than ID) is required for update",
  });

export default updateDishSchema;

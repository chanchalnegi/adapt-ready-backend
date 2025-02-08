// src/schemas/dishSchema.ts
import Joi from "joi";

const dishSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Name is required" }),
  ingredients: Joi.string()
    .required()
    .messages({ "any.required": "Ingredients are required" }),
  diet: Joi.string().valid("vegetarian", "non-vegetarian").required().messages({
    "any.only": "Diet must be either vegetarian or non-vegetarian",
  }),
  prep_time: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({ "number.min": "Prep time must be a positive integer" }),
  cook_time: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({ "number.min": "Cook time must be a positive integer" }),
  flavor_profile: Joi.string()
    .required()
    .messages({ "any.required": "Flavor profile is required" }),
  course: Joi.string()
    .required()
    .messages({ "any.required": "Course is required" }),
  state: Joi.string().allow(null, "").optional(),
  region: Joi.string().allow(null, "").optional(),
});

export default dishSchema;

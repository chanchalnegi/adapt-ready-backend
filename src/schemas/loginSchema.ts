// src/schemas/loginSchema.ts
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export default loginSchema;

import Joi from 'joi';
import { emailRegexp } from '../constants/users-constans.js';
export const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().pattern(emailRegexp), // pattern = для вставки регулярного виразу
  password: Joi.string.min(6).required(),
}); // для реєстрації

export const userSigninSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp),
  password: Joi.string.min(6).required(),
}); //для входу

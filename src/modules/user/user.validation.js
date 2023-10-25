import { isValidObjectId } from "../../middleware/validation.js";
import joi from "joi";

export const wishlistSchema = joi
  .object({
    courseId: joi.string().custom(isValidObjectId).required(),
  })
  .required();

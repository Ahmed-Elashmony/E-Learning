import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
const courseTitle =joi.string().max(60);
const courseSubTitle =joi.string().max(120);
const courseCategory =joi.string().custom(isValidObjectId);
const courseSubCategory =joi.string().custom(isValidObjectId);
const courseLanguage =joi.string();
const coureTags = joi.array().max(50);
const courseDescription = joi.string().min(60).max(200);
const courseCoverImage =joi.string();
const coursePromotionVideoUrl =joi.string();
const allowedLevels = ["Beginner", "Intermediate", "Expert", "All Levels"];
// Define the Joi schema for the string value
const courseLevel = joi.string().valid(...allowedLevels);
const courseId=joi.string().custom(isValidObjectId);

export const createCourseSchema = joi
  .object({
    courseTitle:courseTitle.required()
  })
  .required();

  export const getCourseSchema = joi
  .object({
    courseId:courseId.required()
  })
  .required();

  export const editCourseSchema = joi
  .object({
    courseId:courseId.required(),
    courseTitle:courseTitle,
    courseSubTitle:courseSubTitle,
    courseCategory:courseCategory,
    courseSubCategory:courseSubCategory,
    courseLanguage:courseLanguage,
    coureTags:coureTags,
    courseDescription:courseDescription,
    courseCoverImage:courseCoverImage,
    coursePromotionVideoUrl:coursePromotionVideoUrl,
    courseLevel:courseLevel
  })
  .required();

  

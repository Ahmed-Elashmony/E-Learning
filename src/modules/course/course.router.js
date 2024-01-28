import { Router } from "express";
const router = Router();
import * as courseController from "./course.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./course.validation.js";
import isAuth from "../../middleware/authentication.middleware.js";
// router.post("/createCourse",courseController.createCourse)
router.post("/createCourse",isAuth,
validation(validators.createCourseSchema),
courseController.createCourse)
router.get("/getCourse/:courseId",
validation(validators.getCourseSchema)
,courseController.getCourse)
router.put("/editCourse/:courseId",
validation(validators.editCourseSchema),
isAuth,courseController.editCourse)
router.get("/getMyCreatedCourses",isAuth,courseController.getMyCreatedCourses)

// router.post("/createChapter",courseController.createDraftedCourse)

export default router;

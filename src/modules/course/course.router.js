import { Router } from "express";
const router = Router();
import * as courseController from "./course.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./course.validation.js";
import isAuth from "../../middleware/authntication.middleware.js";
import chapterRouter from "../chapter/chapter.router.js"
// router.post("/createCourse",courseController.createCourse)
router.use("/:courseId/chapter",chapterRouter)

router.post("/createCourse",isAuth,
validation(validators.createCourseSchema),
courseController.createCourse)
router.get("/getCourse/:courseId",
validation(validators.getCourseSchema)
,courseController.getCourse)
router.put("/editCourse/:courseId",
isAuth
,validation(validators.editCourseSchema),
courseController.editCourse)
router.get("/getMyCreatedCourses",isAuth,courseController.getMyCreatedCourses)
// router.post("/createChapter",courseController.createDraftedCourse)

export default router;

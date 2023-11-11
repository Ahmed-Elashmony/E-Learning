import { Router } from "express";
const router = Router({mergeParams:true});
import * as chapterController from "./chapter.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./chapter.validation.js";
import isAuth from "../../middleware/authntication.middleware.js";

router.post("/create_chapter",chapterController.createChapter)

export default router;


import { asyncHandler } from "../../utils/asyncHandling.js";
import Chapter from "../../../DB/model/Chapter.model.js";
export const createChapter = asyncHandler(async (req, res, next) => {
    const {courseId} = req.params;
    console.log(courseId)

    const {chapterOrder , chapterTitle , chapterLearningObjective,}=req.body;
    console.log(chapterOrder)

    const createdChapter = new Chapter({
        course:courseId,
        order:chapterOrder,
        title:chapterTitle,
        learningObjective:chapterLearningObjective
    })
    await createdChapter.save();
    return createdChapter
    ? res.status(200).json({ message: "Done", course:createdChapter._doc })
    : res.json({ message: "something went wrong" })
})
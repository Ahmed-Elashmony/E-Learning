import userModel from "../../../DB/model/user.model.js";
import courseModel from "../../../DB/model/course.model.js";
import { asyncHandler } from "../../utils/asyncHandling.js";

export const addWishlist = asyncHandler(async (req, res, next) => {
  // recieve data
  const { courseId } = req.params;
  // chcek course exists
  const course = await courseModel.findById(courseId);
  if (!course) return next(new Error("Course not found", { cause: 404 }));
  // add to wishlist
  await userModel.updateOne(
    { _id: req.user.id },
    { $addToSet: { wishlist: courseId } }
  );
  return res.status(200).json({ message: "Done" });
});

export const rmWishlist = asyncHandler(async (req, res, next) => {
  // recieve data
  const { courseId } = req.params;
  // add to wishlist
  await userModel.updateOne(
    { _id: req.user.id },
    { $pull: { wishlist: courseId } }
  );
  return res.status(200).json({ message: "Done" });
});

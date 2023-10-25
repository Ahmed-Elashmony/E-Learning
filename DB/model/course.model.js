import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      //unique: true
    },
    info: {
      type: String,
      required: true,
    },
    coverImage: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    price: { type: Number, min: 0, required: true },
    discount: { type: Number, min: 1, max: 100 }, // %
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

const courseModel = model("Course", courseSchema);
export default courseModel;

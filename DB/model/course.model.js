import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {

    title: {
      type: String,
      required:function () {
        return !this.drafted;
      },
      max:60
      //unique: true
    },
    subTitle:{
      type: String,
      required:function () {
        return !this.drafted;
      },
      max:120
    },
    description:{
      type: String,
      required:function () {
        return !this.drafted;
      },
      max:200
    },
    language: {
      type: String,
      required:function () {
        return !this.drafted;
      }
    },
    tags: [{
      type: String,
      max:30,
      required:function () {
        return !this.drafted;
      },
    }],
    level:{
      type: String,
      enum: ["Beginner", "Intermediate","Expert" , "All Levels"],
      required:function () {
        return !this.drafted;
      },
    },
    coverImage: {
       type: String, required:function () {
        return !this.drafted;
      },
    },
      
    
    promotionalVideoUrl:{
      type:String
    },
    price: { type: Number, min: 0, required:function () {
      return !this.drafted;
    },},
    discount: { type: Number, min: 1, max: 100 }, // %
    createdBy: { type: Types.ObjectId, ref: "User", 
    required:function () {
      return !this.drafted;
    },},
    category: { type: Types.ObjectId, ref: "Category", 
    required:function () {
      return !this.drafted;
    },},
    subCategory:{ type: Types.ObjectId, ref: "SubCategory",
     required:function () {
      return !this.drafted;
    },},
    instructors:[ 
      {
        type: Types.ObjectId,
        ref: "User",
        required:function () {
          return !this.drafted;
        },
      }
    ],

    students:[
      {
        type: Types.ObjectId,
        ref: "User",
      }
    ],
    drafted:{
      type:Boolean,
      required:true
    },
    previewed:{
      type:Boolean,
      default:false 
    }
  },
  { timestamps: true }
);

const courseModel = model("Course", courseSchema);
export default courseModel;

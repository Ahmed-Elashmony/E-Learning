import { Schema, model ,Types} from "mongoose";

const lectureSchema = new Schema(
  {
    course:{
        type: Types.ObjectId,
        ref: "Course",
        reuired:true
    },
    chapter:{
        type: Types.ObjectId,
        ref: "Chapter",
        reuired:true
    },
    number:{
        type:Number,
        required:true
      },
    order:{
    type:Number,
    required:true
    },
    
    title:{
        type:String,
        required:true
    },
    describtion:{
        type:String
    },
    videoUrl:{
        type:String,
        required: true
    },
    duaration:{
        type:String,
        required:true
    },
    resources:[
        {
            name:{
                type:String,
                max:60
            },
            url:{
                type:String
            }
        }
    ]
    
  },

    { timestamps: true }

)




const lectureModel = model("Lecture", lectureSchema);
export default lectureModel;

import { asyncHandler } from "../../utils/asyncHandling.js";
import Course from "../../../DB/model/course.model.js";
import Chapter from '../../../DB/model/courseChapter.model.js'
import Lecture from "../../../DB/model/Lecture.model.js";
// export const createCourse = asyncHandler(async (req, res, next) => {

//     const Curriculum= [{number:1,title:"test" ,learningObjective:"learningObjective" ,content:[{type:"lecture" , number:1,lectureType:"video" ,title:"title" ,videoUrl:"videoUrl",resourceUrl:[{name :"resourceName",url:"resourceUrl"}] }]}]
//     const {courseTitle ,courseSubTitle ,courseDescription,courseInfo,
//         courseLevel,courseCoverImage=undefined,coursePromotionVideoUrl=undefined,
//         coursePrice,courseDiscount=undefined ,courseCategory,
//         courseSubCategory,curriculum,courseInstructors}=req.body;
//     const createdCourse =new Course({
//         title:courseTitle,
//         subTitle:courseSubTitle,
//         description:courseDescription,
//         info:courseInfo,
//         level:courseLevel,
//         coverImage:courseCoverImage,
//         promotionalVideoUrl:coursePromotionVideoUrl,
//         price:coursePrice,
//         discount:courseDiscount,
//         createdBy:req.userId,
//         category:courseCategory,
//         subCategory:courseSubCategory,
//         instructors:courseInstructors
//     })
//     await createdCourse.save();
//     if (!curriculum) {
//         return next(new Error("curriculum is required "), { cause: 400 });
//     }
//     for (let i = 0; i < curriculum.length; i++) {
//         const chapter=curriculum[i];
//         const createdChapter =new Chapter({
//             coures:createCourse._id,
//             number:chapter.number,
//             title:chapter.title,
//             learningObjective:chapter.learningObjective
//         })
//         const content = chapter.content;
//         await createdChapter.save();
//         for (let j = 0; j < content.length; j++) {
//             const selectedContent= content[j]
//             if(selectedContent.type ==="lecture"){
//                 const createdLecture=new Lecture({
//                     course:createCourse._id,
//                     courseChapter:createdChapter._id,
//                     number:selectedContent.number,
//                     lectureType:selectedContent.lectureType,
//                     title:selectedContent.title,
//                     describtion:selectedContent.describtion||undefined,
//                     videoUrl:selectedContent.videoUrl||undefined,
//                     resources:selectedContent.resources||undefined,
//                     article:selectedContent.article||undefined
//                 })
//                 await createdLecture.save();
//             }
//         }

//     }

// })


export const createCourse = asyncHandler(async (req, res, next) => {
    const  {courseTitle} =req.body;
    console.log(courseTitle)
    const createdCourse =new Course({
        title:courseTitle,
        createdBy:req.userId,
        drafted:true

    })
    await createdCourse.save();
    return createdCourse
    ? res.status(200).json({ message: "Done", course:createdCourse._doc })
    : res.json({ message: "something went wrong" })
})


export const getCourse = asyncHandler(async (req, res, next) => {
    const  {courseId} =req.params;
    const fetchedCourse =await Course.findById(courseId)
    if (!fetchedCourse) {
        return next(new Error("course not Found"), { cause: 404 });
    }
    return fetchedCourse
    ? res.status(200).json({ message: "Done", course:fetchedCourse._doc })
    : res.json({ message: "something went wrong" })
})


export const editCourse = asyncHandler(async (req, res, next) => {
    const {courseTitle ,courseSubTitle,
        courseCategory,courseSubCategory,courseLanguage,
        coursePrice,courseDiscount,coureTags,courseDescription,
        courseCoverImage,coursePromotionVideoUrl,courseLevel} =req.body
    const  {courseId} =req.params;
    let editedCourse =await Course.findById(courseId);
    if (!editedCourse) {
        return next(new Error("course not Found"), { cause: 404 });
    }
    if (!(editedCourse.createdBy===req.userId)) {
        return next(new Error("you donot have access"), { cause: 404 });
    }
    await Course.updateOne(({_id:courseId}),{
        title:courseTitle,
        subTitle:courseSubTitle,
        description:courseDescription,
        language:courseLanguage,
        level:courseLevel,
        coverImage:courseCoverImage,
        promotionalVideoUrl:coursePromotionVideoUrl,
        price:coursePrice,
        discount:courseDiscount,
        category:courseCategory,
        subCategory:courseSubCategory,
        tags:coureTags,
    })
   
    editedCourse =await Course.findById(courseId);
  
    return editedCourse
    ? res.status(200).json({ message: "Done", course:editedCourse._doc })
    : res.json({ message: "something went wrong" });
})


export const getMyCreatedCourses = asyncHandler(async (req, res, next) => {
    let myCourses= await Course.find({createdBy:req.userId});
    myCourses.map(course=>course._doc)
    if (myCourses.length<=0) {
        return next(new Error("course not Found"), { cause: 404 });
    }
    return myCourses
    ? res.status(200).json({ message: "Done", courses:myCourses })
    : res.json({ message: "something went wrong" });
})
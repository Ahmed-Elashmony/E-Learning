import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(`${process.env.CONNECTION_URL}`)
    .then((result) => {
      console.log("DataBase Connected Successfully....");
    })
    .catch((error) => {
      console.log("failed to connect to database", error);
    });
};

export default connectDB;

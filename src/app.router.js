import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrorHandler } from "./utils/asyncHandling.js";
import cors from "cors";

const appRouter = (app, express) => {
  // Cors
  app.use(cors({}));

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use("/", (req, res, next) => {
    return res.send("Home Page");
  });

  app.all("*", (req, res) => {
    return res.json({ message: "inVaild Path" });
  });

  connectDB();
  app.use(globalErrorHandler);
};

export default appRouter;

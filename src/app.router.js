import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrorHandler } from "./utils/asyncHandling.js";

const appRouter = (app, express) => {
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.all("*", (req, res) => {
    return res.json({ message: "inVaild Path" });
  });

  connectDB();
  app.use(globalErrorHandler);
};

export default appRouter;

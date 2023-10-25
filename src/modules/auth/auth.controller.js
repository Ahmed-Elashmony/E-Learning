import userModel from "../../../DB/model/user.model.js";
import tokenModel from "../../../DB/model/token.model.js";
import { asyncHandler } from "../../utils/asyncHandling.js";
import bcryptjs from "bcryptjs";
import Cryptr from "cryptr";
import crypto from "crypto";
import sendEmail from "../../utils/sentEmail.js";
import { ConfirmTemp, resetPassTemp } from "../../utils/htmlTemps.js";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import cartModel from "../../../DB/model/cart.model.js";

export const signUp = asyncHandler(async (req, res, next) => {
  // receive data
  const { userName, email, password, gender, phone, role, age } = req.body;
  // check user exists
  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    return next(new Error("email is Registred before"), { cause: 400 });
  }
  const checkName = await userModel.findOne({ userName });
  if (checkName) {
    return next(new Error("userName must be unique"), { cause: 400 });
  }
  // hash password
  const hashPassword = await bcryptjs.hash(password, +process.env.SALAT_ROUND);
  //   encrypt phone
  const cryptr = new Cryptr(process.env.CRPTO_PHONE);
  const encryptPhone = cryptr.encrypt(phone);
  // generate activation
  const activationCode = crypto.randomBytes(64).toString("hex");
  // create user
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    phone: encryptPhone,
    gender,
    role,
    age,
    activationCode,
  });
  // create confirmLink
  const link = `https://e-learning-three-liart.vercel.app/auth/confirmEmail/${activationCode}`;
  // send email
  const isSent = await sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: ConfirmTemp(link),
  });
  // send response
  return isSent
    ? res.status(200).json({ message: "Done", user })
    : res.json({ message: "something went wrong", isSent });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  // receive activation code
  const { activationCode } = req.params;
  // confirm email and delete confirmationCode
  const user = await userModel.findOneAndUpdate(
    { activationCode },
    {
      isConfirm: true,
      $unset: { activationCode: 1 },
    }
  );
  // check user exists
  if (!user) return next(new Error("user not found"), { cause: 404 });

  // Create Cart
  await cartModel.create({ user: user._id });

  return res.send("your email is confirmed"); // res.redirect("SignIn Page")
});

export const LogIn = asyncHandler(async (req, res, next) => {
  // receive data
  const { email, password } = req.body;
  // check user exists
  const checkEmail = await userModel.findOne({ email });
  if (!checkEmail) return next(new Error("User not found"), { cause: 404 });
  // check confirmation
  if (!checkEmail.isConfirm)
    return next(new Error("unConfirmed Email"), { cause: 400 });
  // check password
  const matchPass = bcryptjs.compareSync(password, checkEmail.password);
  if (!matchPass) return next(new Error("Wrong password"), { cause: 400 });
  // create a token
  const token = jwt.sign(
    { id: checkEmail._id, email: checkEmail.email },
    process.env.TOKEN_SIGNTURE,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
  const BrearerToken = process.env.BEARER_TOKEN + token;
  // save token in DB
  await tokenModel.create({
    token,
    user: checkEmail._id,
    agent: req.headers["user-agent"],
  });
  // change online state
  checkEmail.isOnline = true;
  await checkEmail.save();
  // sent response
  return res.status(200).json({ message: "Done", BrearerToken });
});

export const forgetCode = asyncHandler(async (req, res, next) => {
  // check email
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new Error("email not found"), { cause: 404 });
  // generate code
  const code = randomstring.generate({
    length: 5,
    charset: "numeric",
  });
  // save code
  user.forgetCode = code;
  await user.save();
  // send email
  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: resetPassTemp(code),
  });
  return res.status(200).send("Done, check your Email");
});

export const verifyCode = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  // check user
  const user = await userModel.findOneAndUpdate(
    { forgetCode: code },
    { $unset: { forgetCode: 1 } }
  );
  if (!user) return next(new Error("inVaild Code", { cause: 404 }));
  // inValid all tokens
  await tokenModel.updateMany({ user: user._id }, { valid: false });
  // create a token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGNTURE,
    { expiresIn: 60 * 60 * 24 }
  );
  // save token in DB
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  // redirect
  return res.status(200).json({ message: "Done", token });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  // Recieve data
  const { password } = req.body;
  const { token } = req.headers;
  const checkToken = await tokenModel.findOne({ token });
  if (!checkToken) return next(new Error("Invalid token"));
  // verify token
  const decoded = jwt.verify(token, process.env.TOKEN_SIGNTURE);
  if (!decoded?.id) {
    return next(new Error("inVaild Payload", { cause: 404 }));
  }
  // Hash and update Password
  const hashPass = await bcryptjs.hash(password, +process.env.SALAT_ROUND);
  await userModel.findByIdAndUpdate(decoded.id, {
    password: hashPass,
  });
  await tokenModel.deleteOne({ token });
  // response
  return res.status(200).json({ message: "Done" });
});
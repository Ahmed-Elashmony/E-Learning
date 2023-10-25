import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./auth.validation.js";

// SignUp
router.post(
  "/SignUp",
  validation(validators.signUpSchema),
  authController.signUp
);

// Confirm Email
router.get(
  "/confirmEmail/:activationCode",
  validation(validators.activateCodeSchema),
  authController.confirmEmail
);

// LogIn
router.post("/logIn", validation(validators.logInSchema), authController.LogIn);

// sent forget password code
router.patch(
  "/forgetCode",
  validation(validators.forgetCodeSchema),
  authController.forgetCode
);

router.patch(
  "/verifyCode",
  validation(validators.verifyCodeSchema),
  authController.verifyCode
);

router.patch(
  "/changePassword",
  validation(validators.changePasswordSchema),
  authController.changePassword
);

export default router;

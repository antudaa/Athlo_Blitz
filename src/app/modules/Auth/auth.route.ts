import express, { Request, Response } from "express";
import requestValidator from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controllert";
import { UserValidation } from "../user/user.validation";
import { UserControllers } from "../user/user.controller";

const router = express.Router();

router.post(
  "/signup",
  requestValidator(UserValidation.createUserValidationSchema),
  UserControllers.signUpUser,
);

router.post(
  "/login",
  requestValidator(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;

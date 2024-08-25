import express, { Request, Response } from "express";
import requestValidator from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controllert";
import { UserValidation } from "../user/user.validation";
import { UserControllers } from "../user/user.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

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

router.post(
  "/change-password",
  auth(
    USER_ROLE.admin,
    USER_ROLE.user,
  ),
  requestValidator(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post('/refresh-token',
  requestValidator(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,

)

export const AuthRoutes = router;

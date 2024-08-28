import express from "express";
import { authenticateUser, authorizeAdmin } from "../../middlewares/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get('/',
  authenticateUser,
  authorizeAdmin,
  UserControllers.getAllUsers
);

export const UserRoutes = router;

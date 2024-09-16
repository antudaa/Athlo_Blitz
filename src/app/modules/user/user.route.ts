import express from "express";
import { authenticateUser, authorizeAdmin } from "../../middlewares/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get('/',
  authenticateUser,
  authorizeAdmin,
  UserControllers.getAllUsers
);

router.get('/get-user/:id',
  // authenticateUser,
  UserControllers.getUserFullData,
);

router.patch('/block/:id',
  authenticateUser,
  authorizeAdmin,
  UserControllers.blockUserBySuperAdmin,
);

export const UserRoutes = router;

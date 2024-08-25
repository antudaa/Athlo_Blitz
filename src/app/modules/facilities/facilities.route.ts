import express from "express";
import { FacilityControllers } from "./facilities.controller";
import requestValidator from "../../middlewares/validateRequest";
import { facilityValidation } from "./facilities.validation";
import { auth, authenticateUser, authorizeAdmin } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  requestValidator(facilityValidation.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

router.patch(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  requestValidator(facilityValidation.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  FacilityControllers.deleteFacility,
);

router.get("/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.user
  ),
  FacilityControllers.getAllFacility);

export const FacilityRoutes = router;

import express from "express";
import { FacilityControllers } from "./facilities.controller";
import requestValidator from "../../middlewares/validateRequest";
import { facilityValidation } from "./facilities.validation";
import { authenticateUser, authorizeAdmin } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  // requestValidator(facilityValidation.createFacilityValidationSchema),
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
  FacilityControllers.getAllFacility);

router.get("/:id",
  FacilityControllers.getFaciltyByID);

export const FacilityRoutes = router;

import express from 'express';
import { authenticateUser, authorizeAdmin, authorizeUser } from '../../middlewares/auth';
import { UserReviewValidation } from './review.validation';
import requestValidator from '../../middlewares/validateRequest';
import { UserReviewControllers } from './review.controller';

const router = express.Router();

router.post(
    "/",
    authenticateUser,
    // authorizeUser,
    requestValidator(UserReviewValidation.userReviewSchema),
    UserReviewControllers.createUserReview,
);

router.get(
    "/",
    authenticateUser,
    authorizeAdmin,
    UserReviewControllers.getAllReviews,
);

router.get(
    "/:id",
    authenticateUser,
    authorizeAdmin,
    UserReviewControllers.getReviewById,
);

router.patch(
    "/:id",
    authenticateUser,
    // authorizeAdmin,
    UserReviewControllers.updateReview,
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeAdmin,
    UserReviewControllers.deleteReview,
);

export const UserReviewRoutes = router;
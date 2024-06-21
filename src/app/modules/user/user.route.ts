import express from 'express';
import { UserControllers } from './user.controller';
import requestValidator from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// router.post('/signup',
//     requestValidator(UserValidation.createUserValidationSchema),
//     UserControllers.signUpUser);

router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
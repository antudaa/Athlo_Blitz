import express from 'express';
import { UserControllers } from './user.controller';
import requestValidator from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/signup', 
    requestValidator(UserValidation.createUserValidationSchema),
     UserControllers.createUser);

export const UserRoutes = router;
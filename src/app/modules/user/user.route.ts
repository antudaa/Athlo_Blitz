import express from 'express';
import { UserControllers } from './user.controller';

import requestValidator from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post('/signup', requestValidator(userValidations.createUserValidationSchema), UserControllers.createUser);


export const UserRoutes = router;
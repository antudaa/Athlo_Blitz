import express, { Request, Response } from 'express';
import requestValidator from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controllert';

const router = express.Router();

router.post('/login', requestValidator(AuthValidation.loginValidationSchema), AuthControllers.loginUser);

router


export const AuthRoutes = router;
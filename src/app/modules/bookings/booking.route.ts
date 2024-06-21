import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import requestValidator from '../../middlewares/validateRequest';
import { bookingValidations } from './bookings.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), requestValidator(bookingValidations.createBookingValidationSchema), BookingControllers.createBooking);

router.get('/', auth(USER_ROLE.admin), BookingControllers.viewAllBookingsByAdmin);

router.get('/user', auth(USER_ROLE.user), BookingControllers.viewBookingsByUser);

export const BookingRoutes = router;
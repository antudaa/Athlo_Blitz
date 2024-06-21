import express from 'express';
import auth from '../../middlewares/auth';
import { FacilityControllers } from './facilities.controller';
import { USER_ROLE } from '../user/user.constant';
import requestValidator from '../../middlewares/validateRequest';
import { facilityValidation } from './facilities.validation';

const router = express.Router();

router.post('/',
    auth(USER_ROLE.admin),
    requestValidator(facilityValidation.createFacilityValidationSchema),
    FacilityControllers.createFacility
);

router.patch('/:id',
    auth(USER_ROLE.admin),
    requestValidator(facilityValidation.updateFacilityValidationSchema),
    FacilityControllers.updateFacility
);

router.delete('/:id',
    auth(USER_ROLE.admin),
    FacilityControllers.deleteFacility
);

router.get('/', FacilityControllers.getAllFacility);

export const FacilityRoutes = router;
import express from "express";
import { authenticateUser, authorizeAdmin, authorizeUser } from "../../middlewares/auth";
import { ClientControllers } from "./client.controller";

const router = express.Router();

// Get All Client
router.get('/',
    authenticateUser,
    authorizeAdmin,
    ClientControllers.getAllClient,
);

// Get Client By ID
router.get('/:id',
    authenticateUser,
    authorizeAdmin,
    ClientControllers.getClientByID,
);

// Block Client / User
router.patch('/block-client/:id',
    authenticateUser,
    authorizeAdmin,
    ClientControllers.blockClientByID,
);

// Soft Delete Client / User
router.delete('/delete-client/:id',
    authenticateUser,
    authorizeAdmin,
    ClientControllers.deleteClientByID,
);

// Update Client / User
router.patch('/update-client/:id',
    authenticateUser,
    authorizeUser,
    ClientControllers.deleteClientByID,
);

export const ClientRoutes = router;
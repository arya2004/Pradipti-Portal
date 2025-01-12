import express from 'express';
import { login, register } from '../controllers/authentication';
import { getAllUsers } from '../db/userOperations';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/users', isAuthenticated, getAllUsers);

export default router;
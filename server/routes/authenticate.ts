import express from 'express';
import { login, register } from '../controllers/authentication';
import { getUsers } from '../controllers/userController';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/users', isAuthenticated, getUsers);

export default router;
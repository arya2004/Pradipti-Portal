import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();
router.use(express.json()); // Make sure this is before your routes
router.get('/users', getUsers);
router.post('/users', createUser);

export default router;

import express from 'express';
import { getUsers, createNewUser } from '../controllers/userController';

const router = express.Router();
router.use(express.json()); // Make sure this is before your routes
router.get('/users', getUsers);
router.post('/users', createNewUser);

export default router;

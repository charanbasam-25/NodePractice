import express from 'express';
import { getUserById, createUser, updateUser,deleteUser, login, getUserDetails } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/', getUserDetails);

router.post("/",createUser);

router.put('/:userId', updateUser)

router.delete('/:userId', deleteUser);

export default router;

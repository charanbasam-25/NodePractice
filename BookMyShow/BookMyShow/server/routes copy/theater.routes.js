import express from 'express';
import { addTheater, deleteTheater, getAllTheater, getTheaterById, updateTheater } from '../controllers/theater.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", authMiddleware, addTheater);
router.get("/:theaterId", getTheaterById);
router.put("/:theaterId",updateTheater);
router.delete("/:theaterId",deleteTheater);
router.get("/",getAllTheater);

export default router;

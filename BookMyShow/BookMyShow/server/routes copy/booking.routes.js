import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createBooking, getBooking, makePayment } from '../controllers/booking.controller.js';
const router = express.Router();


router.post("/make-payment", authMiddleware, makePayment);
router.post("/", authMiddleware, createBooking);
router.post("/", authMiddleware, getBooking);

export default router;

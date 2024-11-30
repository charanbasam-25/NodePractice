import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createBooking, getBookingDetail, makePayment } from '../controllers/booking.controller.js';

const router = express.Router();
router.post('/create-checkout', makePayment);
router.post('/confirm',authMiddleware, createBooking);
router.get('/', authMiddleware, getBookingDetail);

export default router;
import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import istheaterOwner from '../middleware/isTheaterOwner.middleware.js';

import { addShow,updateShow,deleteShow,getShowById, getShowByFilter } from '../controllers/show.controller.js';

const router = express.Router();

router.post("/", authMiddleware, istheaterOwner, addShow);
router.put("/:showId",authMiddleware,istheaterOwner,updateShow);
router.delete("/:showId",authMiddleware,deleteShow);
router.get("/:showId", getShowById);
router.get('/',getShowByFilter)


export default router;

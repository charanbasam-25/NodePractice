import express from 'express';
import { addMovie,getMovieById,getAllMovie ,updateMovie,deleteMovie } from '../controllers/movie.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import isAdminMiddleware from '../middleware/isAdmin.middleware.js';

const router = express.Router();

router.post("/", authMiddleware, isAdminMiddleware, addMovie);
router.get("/:movieId", getMovieById);
router.get("/",getAllMovie);
router.put("/:movieId",authMiddleware,isAdminMiddleware,updateMovie);
router.delete("/:movieId",authMiddleware,isAdminMiddleware,deleteMovie);


export default router;

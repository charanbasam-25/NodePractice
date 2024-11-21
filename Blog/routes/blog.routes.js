import express from 'express';
import { getAllBlog, getBlogById, deleteBlogById, createBlogById, updateBlogById } from '../controllers/blog.controller.js';

const router = express.Router();
router.get('/:blogId', getBlogById);
router.get('/',getAllBlog);

router.post("/",createBlogById);
router.put('/:blogId',updateBlogById)
router.delete('/:blogId',deleteBlogById);

export default router;

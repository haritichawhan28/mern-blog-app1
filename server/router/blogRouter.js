import express from 'express';
import { createBlog, getAllBlogs, getUserBlogs, updateBlog, deleteBlog } from '../controllers/blogController.js';

const blogRouter = express.Router();

// CREATE NEW BLOG
blogRouter.post('/create', createBlog);

// GET ALL BLOGS
blogRouter.get('/', getAllBlogs);

// GET BLOGS BY USER ID
blogRouter.get('/:userId', getUserBlogs);

// UPDATE BLOG BY USER ID AND BLOG ID
blogRouter.put('/:userId/:blogId', updateBlog);

// DELETE BLOG BY USER ID AND BLOG ID
blogRouter.delete('/:userId/:blogId', deleteBlog);

export default blogRouter;

import express from 'express';
import { createUser, loginUser, getUserId } from '../controllers/userController.js';

const userRouter = express.Router();

// CREATE NEW USER
userRouter.post('/register', createUser);

// LOGIN USER
userRouter.post('/login', loginUser);

// GET USER ID
userRouter.get('/getUserId', getUserId);

export default userRouter;

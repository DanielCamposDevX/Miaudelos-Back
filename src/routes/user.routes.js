import { Router } from "express";
import { login, signup,users } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/users/:id',users)




export default userRouter;
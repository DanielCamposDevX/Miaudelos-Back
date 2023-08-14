import { Router } from "express";
import { editPass, editUser, login, signup,users } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/users/:id',users)
userRouter.patch('/users/edit/:id',editUser)
userRouter.patch('/users/edit/:id/pass',editPass)





export default userRouter;
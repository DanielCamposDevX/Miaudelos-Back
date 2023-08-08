import { Router } from "express";
import petRouter from "./pet.routes.js";
import userRouter from "./user.routes.js";


const Routes = Router();

Routes.use(petRouter);
Routes.use(userRouter);


export default Routes
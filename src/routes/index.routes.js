import { Router } from "express";
import petRouter from "./pet.routes";
import userRouter from "./user.routes";


const Routes = Router();

Routes.use(petRouter);
Routes.use(userRouter);


export default Routes
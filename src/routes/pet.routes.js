import { Router } from "express"
import { catModel, getCat } from "../controllers/pet.controller.js";

const petRouter = Router();

petRouter.get('/cats', getCat);
petRouter.get('/cats/:id', catModel);




export default petRouter;
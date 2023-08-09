import { Router } from "express"
import { getCat } from "../controllers/pet.controller";

const petRouter = Router();

petRouter.get('/cats',getCat);




export default petRouter;
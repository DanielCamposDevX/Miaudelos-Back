import { Router } from "express"
import { catModel, getBreeds, getCat } from "../controllers/pet.controller.js";

const petRouter = Router();

petRouter.get('/cats', getCat);
petRouter.get('/cats/:id', catModel);
petRouter.get('/breed/:id', getBreeds);





export default petRouter;
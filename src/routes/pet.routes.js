import { Router } from "express"
import { catModel, getBreeds, getCat, postCat } from "../controllers/pet.controller.js";

const petRouter = Router();

petRouter.get('/cats', getCat);
petRouter.get('/cats/:id', catModel);
petRouter.get('/breed/:id', getBreeds);
petRouter.post('/cats', postCat);





export default petRouter;
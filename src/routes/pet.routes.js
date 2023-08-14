import { Router } from "express"
import { catModel, getBreeds, getCat, getComments, postCat, postComments } from "../controllers/pet.controller.js";

const petRouter = Router();

petRouter.get('/cats', getCat);
petRouter.get('/cats/:id', catModel);
petRouter.get('/breed/:id', getBreeds);
petRouter.post('/cats', postCat);
petRouter.get('/:id/comments',getComments);
petRouter.post('/:id/comments/new',postComments)





export default petRouter;
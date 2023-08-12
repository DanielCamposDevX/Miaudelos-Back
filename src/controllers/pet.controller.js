import { Cats, ValidateToken, uniqueCat,Breed } from "../repositories/cat.repositories.js";


export async function getCat(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){return res.sendStatus(401)}
    const exist = ValidateToken(token);
    if(exist < 0){return res.sendStatus(401)}
    try{
        const data = await Cats();
        console.log(data)
        return res.status(200).send(data);
    }
    catch(err){
        alert(err);
    }
}


export async function catModel(req,res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){return res.sendStatus(401)}
    try{
    const exist = await ValidateToken(token);

    if(exist < 0){return res.sendStatus(401)}
    const cat = await uniqueCat(id);
    if(cat.err){return res.status(500).send(t.err)};

    return res.status(200).send(cat);
    }
    catch(err){
        return res.status(500).send(err);
    }
}

export async function getBreeds(req,res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){return res.sendStatus(401)}
    try{
    const exist = await ValidateToken(token);
    if(exist < 0){return res.sendStatus(401)};
    const breed = await Breed(id);
    if(breed.err){ return res.status(500).send(breed.err)}
    return res.status(200).send(breed);
    }
    catch(err){
        return res.status(500).send(err);
    }
}
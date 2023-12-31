import { Cats, ValidateToken, ValidateToken2, uniqueCat, Breed, CreateCat, Comments, CreateComment } from "../repositories/cat.repositories.js";


export async function getCat(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) { return res.sendStatus(401) }
    const exist = ValidateToken(token);
    if (exist < 0) { return res.sendStatus(401) }
    try {
        const data = await Cats();
        console.log(data)
        return res.status(200).send(data);
    }
    catch (err) {
        alert(err);
    }
}


export async function catModel(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) { return res.sendStatus(401) }
    try {
        const exist = await ValidateToken(token);

        if (exist < 0) { return res.sendStatus(401) }
        const cat = await uniqueCat(id);
        if (cat.err) { return res.status(500).send(t.err) };

        return res.status(200).send(cat);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}

export async function getBreeds(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) { return res.sendStatus(401) }
    try {
        const exist = await ValidateToken(token);
        if (exist < 0) { return res.sendStatus(401) };
        const breed = await Breed(id);
        if (breed.err) { return res.status(500).send(breed.err) }
        return res.status(200).send(breed);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}


export async function postCat(req, res) {
    const { authorization } = req.headers;
    const { name, image, color, breedid, description } = req.body;
    const token = authorization?.replace("Bearer ", "");
    if (!token) { return res.sendStatus(401) };
    try {
        const exist = await ValidateToken2(token);
        if (exist.err) { return res.status(500).send(exist.err) };
        const create = await CreateCat(name, image, color, breedid, description, exist.userid);
        if (create.err) { return res.status(500).send(create.err) };
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}

export async function getComments(req,res){
    const { id } = req.params;
    try{
    const comments = await Comments(id);
    if(comments.err){ return res.status(500).send(comments.err) }
    return res.status(200).send(comments);
    }
    catch(err){
        return res.status(500).send(err)
    }
}

export async function postComments(req,res){
    const { id } = req.params;
    const { userid,comment,rate } = req.body
    try{
        await CreateComment(id,userid,comment,rate);
        return res.sendStatus(201);
    }
    catch(err){
        return res.status(500).send(err)
    }
}
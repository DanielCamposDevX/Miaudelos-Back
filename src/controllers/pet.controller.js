import { Cats } from "../repositories/cat.repositories.js";


export async function getCat(req, res) {
    const { authentication } = req.headers;
    const token = authentication?.replace("Bearer ", "");
    if(!token){return res.sendStatus(401)}
    const exist = ValidateToken(token);
    if(exist < 0){return res.sendStatus(401)}
    try{
        const data = Cats();
        return res.status(200).send(data);
    }
    catch(err){
        alert(err);
    }
}
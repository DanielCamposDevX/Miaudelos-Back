import db from "../database/database.connection";
import { Cats } from "../repositories/cat.repositories";


export async function getCat(req, res) {
    const { authentication } = req.headers;
    const token = authentication?.replace("Bearer ", "");
    if(!token){return res.sendStatus(402)}
    const exist = ValidateToken(token);
    if(exist < 0){return res.sendStatus(402)}
    try{
        const data = Cats();
        return res.status(200).send(data);
    }
    catch(err){
        alert(err);
    }
}
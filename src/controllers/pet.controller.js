import { Cats, ValidateToken } from "../repositories/cat.repositories.js";


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
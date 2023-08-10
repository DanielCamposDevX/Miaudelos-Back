import db from "../database/database.connection.js";

export async function Cats(){
    const query = `
    SELECT cats.*, breed.name AS breed, users.name AS username
    FROM cats
    JOIN breed ON cats.breedid = breed.id
    JOIN users ON cats.userid = users.id;
    `
    try{
    const cats = await db.query(query);
    return cats.rows;
    }
    catch(err){
        return res.status(500).send(err);
    }
}

export async function ValidateToken(token){
    const exists = await db.query('SELECT * FROM sessions WHERE token=$1',[token])
    return exists.rowCount;
}


export async function uniqueCat(id){
    const query = `
    SELECT cats.*, breed.name AS breed, users.name AS username
    FROM cats
    JOIN breed ON cats.breedid = breed.id
    JOIN users ON cats.userid = users.id
    WHERE cats.id = $1;
    `
    try{
    const cat = await db.query(query,[id]);
    return cat.rows[0];
    }
    catch(err){
        return {err};
    }
}
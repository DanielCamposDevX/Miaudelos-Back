import db from "../database/database.connection.js";

export async function Cats(){
    const query = `
    SELECT cats.*, breed.name AS breed, users.name AS username
    FROM cats
    JOIN breed ON cats.breedid = breed.id
    JOIN users ON cats.userid = users.id;
    `
    const cats = await db.query(query);
    return cats.rows;
}

export async function ValidateToken(token){
    const exists = await db.query('SELECT * FROM sessions WHERE token=$1',[token])
}
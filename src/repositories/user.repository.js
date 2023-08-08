import db from "../database/database.connection.js";
import { v4 as uuid } from "uuid";

export async function createUser(name,cpf,email,password,phone){
    try{
    await db.query('INSERT INTO users (name,cpf,email,password,phone) VALUES($1,$2,$3,$4,$5)',[name, cpf ,email ,password, phone])
    return 'created';
    }
    catch(err){
        return err;
    }
}


export async function getUser(email,password){
    const user = await db.query('SELECT * FROM users WHERE email = $1',[email])
    return user.rows[0];
}


export async function connectUser(id){
    const token = uuid();
    try{
    await db.query('INSERT INTO sessions (userid,token) VALUES($1,$2)',[id,token]);
    return 'connected';
    }
    catch(err){
        return err;
    }
}
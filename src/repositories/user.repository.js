import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/database.connection.js";

export async function createUser(name, cpf, email, password, phone) {
    try {
        const encrypt = bcrypt.hashSync(password, 10);
        await db.query('INSERT INTO users (name,cpf,email,password,phone) VALUES($1,$2,$3,$4,$5)', [name, cpf, email, encrypt, phone])
        return 0;
    }
    catch (err) {
        return { err };
    }
}


export async function getUser(email) {
    try {
        const query=`
        SELECT users.*, sessions.userid AS sessionid, sessions.token AS token
        FROM users
        LEFT JOIN sessions ON users.id = sessions.userid
        WHERE users.email = $1;
        `
        const user = await db.query(query, [email])
        return user.rows[0];
    }
    catch (err) {
        return { err };
    }
}


export async function connectUser(id) {
    const token = uuid();
    try {
        await db.query('INSERT INTO sessions (userid,token) VALUES($1,$2)', [id, token]);
        return { status: 'connected', token };
    }
    catch (err) {
        return { err };
    }
}

export async function Loged(id) {
    try {
        const exists = await db.query('SELECT token FROM sessions WHERE userid=$1', [id]);
        return { status: 'connected', exist: exists.rows[0] };
    }
    catch (err) {
        return err
    }
}


export async function Exists(email, cpf) {
    try {
        const response = []
        const emailexist = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailexist.rowCount > 0) {
            response.push('email exists');
        }
        const cpfexist = await db.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
        if (cpfexist.rowCount > 0) {
            response.push('cpf exists');
        }
        return response;
    }
    catch (err) {
        return { err };
    }

}


export async function getUser2(id) {
    try {
        const user = await db.query('SELECT name,phone,email FROM users WHERE id = $1', [id]);
        const cats = await db.query('SELECT name,image,id FROM cats WHERE userid = $1',[id]);
        return { user:user.rows[0] , cats:cats.rows}
    }
    catch (err) {
        return { err };
    }
}

export async function changeUser(email,phone,name,id){
    try{
        await db.query('UPDATE users SET email = $1, phone = $2 , name = $3 WHERE id = $4',[email,phone,name,id])
        return 0
    }
    catch(err){
        return {err}
    }
}

export async function changePass(pass,id){
    try{
        const encrypt = bcrypt.hashSync(pass, 10);
        await db.query('UPDATE users SET password = $1 WHERE id = $2',[encrypt,id])
        return 0
    }
    catch(err){
        return {err}
    }
}
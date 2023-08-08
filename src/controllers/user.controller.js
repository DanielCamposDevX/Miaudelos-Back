import { signupSchema } from '../schemas/signupSchema.js';
import { loginSchema } from '../schemas/loginSchema.js';
import { connectUser, createUser, getUser } from '../repositories/user.repository.js';
import bcrypt from "bcrypt";

export async function signup(req, res) {
    const { name, cpf, email, password, phone } = req.body;

    const validation = signupSchema.validate({ name, cpf, email, password, phone }, { abortEarly: false });
    if (validation.error) { const errors = validation.error.details.map((detail) => detail.message); return res.status(422).send(errors); }
    try{
    const create = await createUser(name,cpf,email,password,phone);
    if(create === 'created'){ return res.sendStatus(201)};
    return res.status(500).send(create.detail);
    }
    catch(err){
        return res.status(500).send(err);
    }
}



export async function login(req, res) {
    const { email, password } = req.body;

    const validation = loginSchema.validate({ email, password }, { abortEarly: false });
    if (validation.error) { const errors = validation.error.details.map((detail) => detail.message); return res.status(422).send(errors); }

    try{
    const user = await getUser(email,password);
    if(!user){return res.status(409).send('usuário não encontrado')};
    if(!bcrypt.compareSync(password, user.password)){return res.status(409).send('Senha incorreta')}
    
    const connect = await connectUser(user.id);
    if(connect === 'connected'){return res.sendStatus(200)}
        return res.status(500).send(err);
    }
    catch(err){
        return res.status(500).send(err);
    }
}
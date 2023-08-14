import { signupSchema } from '../schemas/signupSchema.js';
import { loginSchema } from '../schemas/loginSchema.js';
import { connectUser, createUser, Exists, getUser,Loged } from '../repositories/user.repository.js';
import bcrypt from "bcrypt";

export async function signup(req, res) {
    const { name, cpf, email, password, phone } = req.body;

    const validation = signupSchema.validate({ name, cpf, email, password, phone }, { abortEarly: false });
    if (validation.error) { const errors = validation.error.details.map((detail) => detail.message); return res.status(422).send(errors); }
    try{
    const exist = await Exists(email,cpf);
    if (exist.err){ return res.status(500).send(exist.err)};
    if(exist.length > 0){ return res.status(409).send(exist[0]) };
    const create = await createUser(name,cpf,email,password,phone);
    if(create.err){ return res.status(500).send(create.detail);}
        return res.sendStatus(201);
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
    if(!user){return res.status(404).send('usuário não encontrado')};
    if(user.err){return res.status(500).send(user.err)}
    if(!bcrypt.compareSync(password, user.password)){return res.status(401).send('Senha incorreta')}

    const exists = await Loged(user.id);
    if(exists.status == 'connected'){if(exists.exist){return res.status(200).send({token:exists.exist.token,name: user.name,userid: user.id})}}
    if(exists.err){return res.status(500).send(exists.err)}


    const connect = await connectUser(user.id);
    if(connect.status === 'connected'){return res.status(200).send({token:connect.token, name: user.name,userid: user.id})}
    }
    catch(err){
        return res.status(500).send(err);
    }
    
}
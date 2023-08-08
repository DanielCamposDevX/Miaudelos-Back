import { signupSchema } from '../schemas/signupSchema.js'
import { loginSchema } from '../schemas/loginSchema.js';

export function signup(req, res) {
    const { name, cpf, email, password, confpassword, phone } = req.body;

    const validation = signupSchema.validate({ name, cpf, email, password, confpassword, phone }, { abortEarly: false });
    if (validation.error) { const errors = validation.error.details.map((detail) => detail.message); return res.status(422).send(errors); }

}



export function login(req, res) {
    const { email, password } = req.body;

    const validation = loginSchema.validate({ email, password }, { abortEarly: false });
    if (validation.error) { const errors = validation.error.details.map((detail) => detail.message); return res.status(422).send(errors); }
    
}
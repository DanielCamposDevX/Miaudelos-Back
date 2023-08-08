import Joi from "joi";


export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    phone: Joi.string().min(10).max(11).required()
})
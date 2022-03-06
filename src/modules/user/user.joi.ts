import * as Joi from 'joi';

const username = Joi.string().email().required();

export const ValideUserJoi=Joi.object({
    username:username
});

export const LoginJoi=Joi.object({
    username:username,
    password:Joi.string().required()
});

export const LoginTwoJoi=Joi.object({
    username:username,
    password:Joi.string().required(),
    code:Joi.string().required()
});



export const ActivePassJoi=Joi.object({
    username:username,
    password:Joi.string().required(),
    users:Joi.object().required()
});

export const CreateUserJoi=Joi.object({
    name:Joi.string().required(),
    last_name:Joi.string().required(),
    phone:Joi.string().required(),
    identification:Joi.string().required(),
    status:Joi.number().required(),
    profiles_sequence:Joi.number().required(),
    mail:username,
    password:Joi.string().required(),
    users:Joi.object().required()
});
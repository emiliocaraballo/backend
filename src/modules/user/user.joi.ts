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
    users:Joi.object()
});
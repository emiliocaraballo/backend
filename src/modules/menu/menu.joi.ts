import * as Joi from 'joi';


export const MenuCreateJoi=Joi.object({
    name:Joi.string().required().min(1).max(255),
    description:Joi.string(),
    order:Joi.number().required(),
    status:Joi.number().required(),
    url:Joi.string().required().min(1).max(255),
    parentid:Joi.number().required(),
    users: Joi.object().required()
});

export const GetParamPadreMenuJoi=Joi.object({
    sequence:Joi.number().required()
});
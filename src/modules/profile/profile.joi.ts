import * as Joi from 'joi';


export const ProfileCreateJoi=Joi.object({
    name:Joi.string().required().min(1).max(255),
    description:Joi.string(),
    icon:Joi.string(),
    status:Joi.number().required(),
    users: Joi.object().required(),
    menu: Joi.object().required()
});

export const ProfileUpdateJoi=Joi.object({
    name:Joi.string().required().min(1).max(255),
    description:Joi.string(),
    status:Joi.number().required(),
    icon:Joi.string(),
    users: Joi.object().required(),
    menu: Joi.object().required()
});

export const GetParamProfileJoi=Joi.object({
    sequence:Joi.number().required()
});
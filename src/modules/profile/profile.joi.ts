import * as Joi from 'joi';

export const ProfileCreateJoi=Joi.object({
    name:Joi.string().required().min(1).max(255),
    description:Joi.string().min(1).max(10000),
    icon:Joi.string(),
    status:Joi.number().required(),
    users: Joi.object().required(),
    menu:Joi.array()
    .unique('sequence')
    .items(
        Joi.object()
        .keys({
        sequence: Joi.number().required()
        }).required()
    ).required()
});

export const ProfileUpdateJoi=Joi.object({
    name:Joi.string().required().min(1).max(255),
    description:Joi.string(),
    icon:Joi.string(),
    status:Joi.number().required(),
    users: Joi.object().required(),
    menu:Joi.array()
    .unique('sequence')
    .items(
        Joi.object()
        .keys({
        sequence: Joi.number().required()
        }).required()
    )
});

export const GetParamProfileJoi=Joi.object({
    sequence:Joi.number().required()
});
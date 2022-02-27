import * as Joi from 'joi';

export const ValideUser=Joi.object({
    username:Joi.string().email().required()
});
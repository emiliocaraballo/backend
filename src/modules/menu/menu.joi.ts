import * as Joi from 'joi';

const username = Joi.string().email().required();

export const ValideMenuCreateJoi=Joi.object({
   
});
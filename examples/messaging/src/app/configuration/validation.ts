import Joi from 'joi';

export const validationSchema = Joi.object({
  LINE_MESSAGING_SECRET: Joi.string().required(),
  LINE_MESSAGING_TOKEN: Joi.string().required(),
});

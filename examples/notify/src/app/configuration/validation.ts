import Joi from 'joi';

export const validationSchema = Joi.object({
  LINE_NOTIFY_CLIENT_ID: Joi.string().required(),
  LINE_NOTIFY_CLIENT_SECRET: Joi.string().required(),
  LINE_NOTIFY_REDIRECT_URI: Joi.string().uri().required(),
});

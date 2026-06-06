import Joi from 'joi';
import logger from '../utils/logger.js';

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    logger.warn(`Validation error: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    logger.warn(`Validation error: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const validateWebsite = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    description: Joi.string().allow(''),
    category: Joi.string().valid('Business', 'Portfolio', 'Blog', 'E-commerce', 'Social', 'News', 'Other'),
    status: Joi.string().valid('Active', 'Inactive')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    logger.warn(`Validation error: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};
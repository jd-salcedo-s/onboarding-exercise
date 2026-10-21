import Joi from "joi";

export const clientIdSchema = Joi.number().positive().integer().min(1).required()

export const clientCreateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    phone_number: Joi.string().max(30).optional(),
    email: Joi.string().email().optional()
})

export const clientUpdateSchema = Joi.object({
    name: Joi.string().max(255).optional(),
    phone_number: Joi.string().max(30).optional(),
    email: Joi.string().email().optional()
})
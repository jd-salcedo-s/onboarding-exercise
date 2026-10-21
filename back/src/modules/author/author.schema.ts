import Joi from "joi";

export const authorIdSchema = Joi.number().positive().integer().min(1).required()

export const authorCreateSchema = Joi.object({
    name: Joi.string().max(255).required()
})

export const authorUpdateSchema = Joi.object({
    name: Joi.string().max(255).optional()
})
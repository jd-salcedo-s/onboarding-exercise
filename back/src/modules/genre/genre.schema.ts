import Joi from "joi";

export const genreIdSchema = Joi.number().positive().integer().min(1).required()

export const genreCreateSchema = Joi.object({
    description: Joi.string().max(255).required()
})

export const genreUpdateSchema = Joi.object({
    description: Joi.string().max(255).optional()
})
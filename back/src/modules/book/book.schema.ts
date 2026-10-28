import Joi from "joi";

export const bookIdSchema = Joi.number().positive().integer().min(1).required()

export const bookCreateSchema = Joi.object({
    author_id: Joi.number().positive().integer().required(),
    genre_id: Joi.number().positive().integer().required(),
    title: Joi.string().max(255).required(),
    publish_date: Joi.date().optional()
})

export const bookUpdateSchema = Joi.object({
    author_id: Joi.number().positive().integer().optional(),
    genre_id: Joi.number().positive().integer().optional(),
    title: Joi.string().max(255).optional(),
    publish_date: Joi.date().optional()
})

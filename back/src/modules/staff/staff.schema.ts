import Joi from "joi";
import { StaffRoles } from "./staff.roles.ts";

export const staffIdSchema = Joi.number().positive().integer().min(1).required()

export const staffCreateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(255).required(),
    role: Joi.string().valid(...Object.values(StaffRoles)).required()
})

export const staffUpdateSchema = Joi.object({
    name: Joi.string().max(255).optional(),
    username: Joi.string().max(100).optional(),
    password: Joi.string().max(255).optional(),
    role: Joi.string().valid(...Object.values(StaffRoles)).optional()
})

export const staffLoginSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(255).required()
})
import Joi from "joi";
import { ReservationStatus } from "./reservation_status.ts";

export const reservationIdSchema = Joi.number().positive().integer().min(1).required()

export const reservationCreateSchema = Joi.object({
    client_id: Joi.number().positive().integer().min(1).required(),
    staff_id: Joi.number().positive().integer().min(1).required(),
})

export const reservationUpdateSchema = Joi.object({
    reservation_status: Joi.string().valid(...Object.values(ReservationStatus)).optional()
})
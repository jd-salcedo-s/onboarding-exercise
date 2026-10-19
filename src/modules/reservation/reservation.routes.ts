import { Router } from "express";
import { ReservationController } from "./reservation.controller.ts";

export const reservationRouter = Router()

reservationRouter.get('/', ReservationController.getAll)
reservationRouter.get('/:id', ReservationController.getById)
reservationRouter.post('/', ReservationController.create)
reservationRouter.patch('/:id', ReservationController.update)
reservationRouter.delete('/:id', ReservationController.delete)
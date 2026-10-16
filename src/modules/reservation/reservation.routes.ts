import { Router } from "express";
import { ReservationController } from "./reservation.controller.ts";

export const reservationRouter = Router()

reservationRouter.get('/', ReservationController.getAll)
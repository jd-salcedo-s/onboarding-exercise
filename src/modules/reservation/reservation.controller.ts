import type { Request, Response } from "express";
import { ReservationRepository } from "./reservation.repository.ts";

export class ReservationController {
    static async getAll(req:Request, res: Response) {
        try {
            const reservations = await ReservationRepository.getAll()
            
            return res.json(reservations)
        } catch {
            return res.status(500)
        }
    }

}
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

    static async getById(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                console.log("Antes de llamar al repo")
                const reservation = await ReservationRepository.getById(id)
                console.log("despues de llamar al repo")

                return res.json(reservation)
            } catch {
                return res.status(500)
            }
        }
    
        static async create(req: Request, res: Response) {
            const data = req.body
            try {
                const created_reservation = await ReservationRepository.create(data) 
    
                return res.json(created_reservation)
            } catch {
                return res.status(500)
            }
        }
    
        static async update(req: Request, res: Response) {
            const data = req.body
            const id = Number(req.params.id)
            try {
                const updated_reservation_count = await ReservationRepository.update(id, data)
    
                return res.json(updated_reservation_count)
            } catch (error) {
                
                return res.status(500).json({
                    message: error instanceof Error
                    ? error.message
                    : "Internal server error"
                })
            }
        }
    
        static async delete(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const success = await ReservationRepository.delete(id)
    
                if (success === 0) return res.status(404).json({
                    message: "Reservation not found"
                })
    
                return res.json(204)
            } catch {
                return res.status(500)
            }
        }
}
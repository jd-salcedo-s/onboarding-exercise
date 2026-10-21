import type { Request, Response } from "express";
import { ReservationRepository } from "./reservation.repository.ts";
import { reservationCreateSchema, reservationIdSchema, reservationUpdateSchema } from "./reservation.schema.ts";

export class ReservationController {
    static async getAll(req: Request, res: Response) {
        try {
            const reservations = await ReservationRepository.getAll()

            return res.json(reservations)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = reservationIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const reservation = await ReservationRepository.getById(id)

            if (!reservation) return res.status(404).json({
                message: "Reservation not found"
            })

            return res.json(reservation)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = reservationCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const createdReservation = await ReservationRepository.create(createBody)

            return res.status(201).json(createdReservation)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = reservationIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = reservationUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const reservation = await ReservationRepository.getById(id)

            if (!reservation) return res.status(404).json({
                message: "Reservation not found"
            })

            const updatedReservationCount = await ReservationRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedReservationCount
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = reservationIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const success = await ReservationRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Reservation not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
import type { Request, Response } from "express";
import { ClientRepository } from "./client.repository.ts";
import { clientCreateSchema, clientIdSchema, clientUpdateSchema } from "./client.schema.ts";
import { ForeignKeyConstraintError } from "sequelize";
import { ReservationRepository } from "../reservation/reservation.repository.ts";

export class ClientController {
    static async getAll(req: Request, res: Response) {
        try {
            const clients = await ClientRepository.getAll()

            return res.json(clients)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = clientIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const client = await ClientRepository.getById(id)

            if (!client) return res.status(404).json({
                message: "Book not found"
            })

            return res.json(client)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = clientCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const created_client = await ClientRepository.create(createBody)

            return res.status(201).json(created_client)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = clientIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = clientUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const client = await ClientRepository.getById(id)

            if (!client) return res.status(404).json({
                message: "Client not found"
            })
            const updatedClientCount = await ClientRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedClientCount
            })
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = clientIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const reservations = await ReservationRepository.clientReservations(id)

            if (reservations > 0) {
                return res.status(409).json({
                    message: "Client has associated reservations"
                })
            }

            const success = await ClientRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Client not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
import type { Request, Response } from "express";
import { StaffRepository } from "./staff.repository.ts";
import { staffCreateSchema, staffIdSchema, staffUpdateSchema } from "./staff.schema.ts";
import { ReservationRepository } from "../reservation/reservation.repository.ts";

export class StaffController {
    static async getAll(req: Request, res: Response) {
        try {
            const staff = await StaffRepository.getAll()

            return res.json(staff)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = staffIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const staff = await StaffRepository.getById(id)

            if (!staff) return res.status(404).json({
                message: "Staff member not found"
            })

            return res.json(staff)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = staffCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const existingUsername = await StaffRepository.findByUsername(createBody.username)

            if (existingUsername) return res.status(400).json({
                message: "Username is already in use"
            })

            const createdStaff = await StaffRepository.create(createBody)

            return res.status(201).json(createdStaff)
        } catch (error) {
            console.log("error: ", error)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = staffIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = staffUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const existingUsername = await StaffRepository.findByUsername(updateBody.username)

            if (existingUsername) return res.status(400).json({
                message: "Username is already in use"
            })

            const staff = await StaffRepository.getById(id)

            if (!staff) return res.status(404).json({
                message: "Staff not found"
            })

            const updatedStaffCount = await StaffRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedStaffCount
            })
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = staffIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const reservations = await ReservationRepository.staffReservations(id)

            if (reservations > 0) {
                return res.status(409).json({
                    message: "Staff member has associated reservations"
                })
            }

            const success = await StaffRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Staff member not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
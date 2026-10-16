import type { Request, Response } from "express";
import { StaffRepository } from "./staff.repository.ts";

export class StaffController {
    static async getAll(req:Request, res: Response) {
        try {
            const staff = await StaffRepository.getAll()
            
            return res.json(staff)
        } catch {
            return res.status(500)
        }
    }

}
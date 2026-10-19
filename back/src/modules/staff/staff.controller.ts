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

    static async getById(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const staff = await StaffRepository.getById(id)
    
                return res.json(staff)
            } catch {
                return res.status(500)
            }
        }
    
        static async create(req: Request, res: Response) {
            const data = req.body
            try {
                const created_staff = await StaffRepository.create(data) 
    
                return res.json(created_staff)
            } catch {
                return res.status(500)
            }
        }
    
        static async update(req: Request, res: Response) {
            const data = req.body
            const id = Number(req.params.id)
            try {
                const updated_staff = await StaffRepository.update(id, data)
    
                return res.json(updated_staff)
            } catch {
                return res.status(500)
            }
        }
    
        static async delete(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const success = await StaffRepository.delete(id)
    
                if (success === 0) return res.status(404).json({
                    message: "Staff member not found"
                })
    
                return res.json(204)
            } catch {
                return res.status(500)
            }
        }
}
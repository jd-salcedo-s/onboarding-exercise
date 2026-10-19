import type { Request, Response } from "express";
import { ClientRepository } from "./client.repository.ts";

export class ClientController {
    static async getAll(req:Request, res: Response) {
        try {
            const clients = await ClientRepository.getAll()
            
            return res.json(clients)
        } catch {
            return res.status(500)
        }
    }

    static async getById(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const client = await ClientRepository.getById(id)
    
                return res.json(client)
            } catch {
                return res.status(500)
            }
        }
    
        static async create(req: Request, res: Response) {
            const data = req.body
            try {
                const created_client = await ClientRepository.create(data) 
    
                return res.json(created_client)
            } catch {
                return res.status(500)
            }
        }
    
        static async update(req: Request, res: Response) {
            const data = req.body
            const id = Number(req.params.id)
            try {
                const updated_client_count = await ClientRepository.update(id, data)
    
                return res.json(updated_client_count)
            } catch {
                return res.status(500)
            }
        }
    
        static async delete(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const success = await ClientRepository.delete(id)
    
                if (success === 0) return res.status(404).json({
                    message: "Client not found"
                })
    
                return res.json(204)
            } catch {
                return res.status(500)
            }
        }
}
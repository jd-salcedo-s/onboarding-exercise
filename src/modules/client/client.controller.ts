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

}
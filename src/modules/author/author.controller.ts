import type { Request, Response } from "express";
import { AuthorRepository } from "./author.repository.ts";

export class AuthorController {
    static async getAll(req:Request, res: Response) {
        try {
            const authors = await AuthorRepository.getAll()
            
            return res.json(authors)
        } catch {
            return res.status(500)
        }
    }

}
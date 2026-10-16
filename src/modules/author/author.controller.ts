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

    static async getById(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const author = await AuthorRepository.getById(id)

            return res.json(author)
        } catch {
            return res.status(500)
        }
    }

    static async create(req: Request, res: Response) {
        const data = req.body
        try {
            const created_author = await AuthorRepository.create(data) 

            return res.json(created_author)
        } catch {
            return res.status(500)
        }
    }

    static async update(req: Request, res: Response) {
        const data = req.body
        const id = Number(req.params.id)
        try {
            const updated_author = await AuthorRepository.update(id, data)

            return res.json(updated_author)
        } catch {
            return res.status(500)
        }
    }

    static async delete(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const success = await AuthorRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Author not found"
            })

            return res.json(204)
        } catch {
            return res.status(500)
        }
    }
}
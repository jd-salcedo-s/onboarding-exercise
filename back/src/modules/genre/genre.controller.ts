import type { Request, Response } from "express";
import { GenreRepository } from "./genre.repository.ts";

export class GenreController {
    static async getAll(req:Request, res: Response) {
        try {
            const genres = await GenreRepository.getAll()
            
            return res.json(genres)
        } catch {
            return res.status(500)
        }
    }

    static async getById(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const genre = await GenreRepository.getById(id)
    
                return res.json(genre)
            } catch {
                return res.status(500)
            }
        }
    
        static async create(req: Request, res: Response) {
            const data = req.body
            try {
                const created_genre = await GenreRepository.create(data) 
    
                return res.json(created_genre)
            } catch {
                return res.status(500)
            }
        }
    
        static async update(req: Request, res: Response) {
            const data = req.body
            const id = Number(req.params.id)
            try {
                const updated_genre = await GenreRepository.update(id, data)
    
                return res.json(updated_genre)
            } catch {
                return res.status(500)
            }
        }
    
        static async delete(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const success = await GenreRepository.delete(id)
    
                if (success === 0) return res.status(404).json({
                    message: "Genre not found"
                })
    
                return res.json(204)
            } catch {
                return res.status(500)
            }
        }
}
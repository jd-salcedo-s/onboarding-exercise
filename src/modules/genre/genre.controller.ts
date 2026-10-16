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

}
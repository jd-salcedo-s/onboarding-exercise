import type { Request, Response } from "express";
import { BookRepository } from "./book.repository.ts";

export class BookController {
    static async getAll(req:Request, res: Response) {
        try {
            const books = await BookRepository.getAll()
            
            return res.json(books)
        } catch {
            return res.status(500)
        }
    }

}
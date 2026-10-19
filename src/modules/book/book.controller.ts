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

     static async getById(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const book = await BookRepository.getById(id)
    
                return res.json(book)
            } catch {
                return res.status(500)
            }
        }
    
        static async create(req: Request, res: Response) {
            const data = req.body
            try {
                const created_book = await BookRepository.create(data) 
    
                return res.json(created_book)
            } catch {
                return res.status(500)
            }
        }
    
        static async update(req: Request, res: Response) {
            const data = req.body
            const id = Number(req.params.id)
            try {
                const updated_book_count = await BookRepository.update(id, data)
    
                return res.json(updated_book_count)
            } catch {
                return res.status(500)
            }
        }
    
        static async delete(req: Request, res: Response) {
            const id = Number(req.params.id)
            try {
                const success = await BookRepository.delete(id)
    
                if (success === 0) return res.status(404).json({
                    message: "Book not found"
                })
    
                return res.json(204)
            } catch {
                return res.status(500)
            }
        }
}
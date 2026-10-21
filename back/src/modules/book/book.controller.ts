import type { Request, Response } from "express";
import { BookRepository } from "./book.repository.ts";
import { bookCreateSchema, bookIdSchema, bookUpdateSchema } from "./book.schema.ts";

export class BookController {
    static async getAll(req: Request, res: Response) {
        try {
            const books = await BookRepository.getAll()

            return res.json(books)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = bookIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const book = await BookRepository.getById(id)

            if (!book) return res.status(404).json({
                message: "Book not found"
            })

            return res.json(book)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = bookCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const createdBook = await BookRepository.create(createBody)

            return res.status(201).json(createdBook)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = bookIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = bookUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const book = await BookRepository.getById(id)

            if (!book) return res.status(404).json({
                message: "Book not found"
            })

            const updatedBookCount = await BookRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedBookCount
            })
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = bookIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const success = await BookRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Book not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
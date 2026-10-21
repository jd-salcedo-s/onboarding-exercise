import type { Request, Response } from "express";
import { GenreRepository } from "./genre.repository.ts";
import { genreCreateSchema, genreIdSchema, genreUpdateSchema } from "./genre.schema.ts";
import { BookRepository } from "../book/book.repository.ts";

export class GenreController {
    static async getAll(req: Request, res: Response) {
        try {
            const genres = await GenreRepository.getAll()

            return res.json(genres)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = genreIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const genre = await GenreRepository.getById(id)

            if (!genre) return res.status(404).json({
                message: "Genre not found"
            })

            return res.json(genre)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = genreCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const createdGenre = await GenreRepository.create(createBody)

            return res.status(201).json(createdGenre)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = genreIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = genreUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const genre = await GenreRepository.getById(id)

            if (!genre) return res.status(404).json({
                message: "Genre not found"
            })

            const updatedGenre = await GenreRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedGenre
            })
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = genreIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const books = await BookRepository.count(id)

            if (books > 0) {
                return res.status(409).json({
                    message: "Genre has associated books"
                })
            }

            const success = await GenreRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Genre not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
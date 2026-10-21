import type { Request, Response } from "express";
import { AuthorRepository } from "./author.repository.ts";
import { authorCreateSchema, authorIdSchema, authorUpdateSchema } from "./author.schema.ts";

export class AuthorController {
    static async getAll(req: Request, res: Response) {
        try {
            const authors = await AuthorRepository.getAll()

            return res.json(authors)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = authorIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const author = await AuthorRepository.getById(id)

            if (!author) return res.status(404).json({
                message: "Author not found"
            })

            return res.json(author)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = authorCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const createdAuthor = await AuthorRepository.create(createBody)

            return res.status(201).json(createdAuthor)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = authorIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = authorUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const author = await AuthorRepository.getById(id)

            if (!author) return res.status(404).json({
                message: "Author not found"
            })

            const updatedAuthorCount = await AuthorRepository.update(id, updateBody)

            return res.json({
                updated_count: updatedAuthorCount
            })
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = authorIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })
        try {
            const success = await AuthorRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Author not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
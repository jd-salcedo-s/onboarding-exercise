import type { Request, Response } from "express";
import { ReservationRepository } from "./reservation.repository.ts";
import { reservationCreateSchema, reservationIdSchema, reservationUpdateSchema } from "./reservation.schema.ts";
import { BookRepository } from "../book/book.repository.ts";
import ReservationBook from "./reservation_book.model.ts";
import type { ReservationBookAttributes } from "./reservation.types.ts";

export class ReservationController {
    static async getAll(req: Request, res: Response) {
        try {
            const reservations = await ReservationRepository.getAll()

            return res.json(reservations)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getById(req: Request, res: Response) {
        const { error, value: id } = reservationIdSchema.validate(req.params.id)

        if (error) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const reservation = await ReservationRepository.getById(id)

            if (!reservation) return res.status(404).json({
                message: "Reservation not found"
            })

            return res.json(reservation)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req: Request, res: Response) {
        const { error, value: createBody } = reservationCreateSchema.validate(req.body)

        if (error) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const books = await BookRepository.getByIds(createBody.books_ids)

            if (books.length !== createBody.books_ids.length) return res.status(400).json({
                message: "Some book not found"
            })
            if (books.length === 0) return res.status(400).json({
                message: "Need at least one book to make a reservation"
            })

            const hasBookedBooks = books.some(
                (book) => book.get('is_booked') === true
            )

            if (hasBookedBooks) {
                return res.status(400).json({
                    message: "Some books are already reserved"
                })
            }

            const createdReservation = await ReservationRepository.create(createBody)

            const reservationBooks: ReservationBookAttributes[] = createBody.books_ids.map((bookId: number) => ({
                reservation_id: createdReservation.get('id') as number,
                book_id: bookId
            }))

            await Promise.all(
                reservationBooks.map(({ book_id }) => {
                    BookRepository.update(book_id, { is_booked: true })
                })
            )

            await ReservationBook.bulkCreate(reservationBooks)

            return res.status(201).json(createdReservation)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async update(req: Request, res: Response) {
        const { error: idError, value: id } = reservationIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        const { error: updateError, value: updateBody } = reservationUpdateSchema.validate(req.body)

        if (updateError) return res.status(400).json({
            message: "Invalid data provided"
        })

        try {
            const reservation = await ReservationRepository.getById(id)

            if (!reservation) return res.status(404).json({
                message: "Reservation not found"
            })

            if (reservation.get('reservation_status') === 'completed') return res.status(400).json({
                message: "Reservation is already completed"
            })

            const updatedReservationCount = await ReservationRepository.update(id, updateBody)

            if (updatedReservationCount[0] === 0) return res.status(400).json({
                message: "Reservation was not updated"
            })

            const reservationBooks = reservation.get('books') as Array<{
                get(key: string): number;
            }>

            await Promise.all(
                reservationBooks.map((book) =>
                    BookRepository.update(book.get('id'), { is_booked: false })
                )
            )

            return res.json({
                updated_count: updatedReservationCount
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        const { error: idError, value: id } = reservationIdSchema.validate(req.params.id)

        if (idError) return res.status(400).json({
            message: "Invalid id param"
        })

        try {
            const success = await ReservationRepository.delete(id)

            if (success === 0) return res.status(404).json({
                message: "Reservation not found"
            })

            return res.sendStatus(200)
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
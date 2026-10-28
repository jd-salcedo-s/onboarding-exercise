import Reservation from "./reservation.model.ts";
import ReservationBook from "./reservation_book.model.ts";
import Book from "../book/book.model.ts";
import sequelize from "../../config/database.ts";
import type { ReservationCreate, ReservationUpdate } from "./reservation.types.ts";
import { ReservationStateMachine } from "./reservation_state_machine.ts";
import type { ReservationStatus } from "./reservation_status.ts";

export class ReservationNotDeletableError extends Error {
    constructor() {
        super('Only expired or completed reservations can be deleted.')
        this.name = 'ReservationNotDeletableError'
    }
}

export class ReservationRepository {
    static async getAll() {
        return await Reservation.findAll({
            include: [
                {
                    association: 'books',
                    attributes: ["id", "title", "publish_date", "is_booked"],
                    through: {
                        attributes: []
                    }
                },
                {
                    association: 'staff',
                    attributes: ["name", "username"]
                },
                {
                    association: 'client',
                    attributes: ["name", "phone_number", "email"]
                }
            ],
            attributes: {
                exclude: ["client_id", "staff_id"]
            }
        })
    }

    static async getById(id: number) {
        const reservation = await Reservation.findOne({
            where: { id },
            include: [
                {
                    association: 'books',
                    attributes: ["id", "title", "publish_date", "is_booked"],
                    through: {
                        attributes: []
                    }
                },
                {
                    association: 'staff',
                    attributes: ["name", "username"]
                },
                {
                    association: 'client',
                    attributes: ["name", "phone_number", "email"]
                }
            ],
            attributes: {
                exclude: ["client_id", "staff_id"]
            }
        })

        return reservation
    }

    static async create(data: ReservationCreate) {
        const reservation_status: ReservationStatus = 'active'

        const start_date = new Date()
        const expiry_days = 15
        const expiry_date = new Date(start_date)
        expiry_date.setDate(expiry_date.getDate() + expiry_days)

        const created_reservation = await Reservation.create({
            client_id: data.client_id,
            staff_id: data.staff_id,
            expiry_date: expiry_date.toISOString().split('T')[0],
            reservation_status,
            start_date: start_date.toISOString().split('T')[0] //para obtener el formato de YEAR-MM-DD
        })

        return created_reservation
    }

    static async update(id: number, data: ReservationUpdate) {
        const update_data: {
            reservation_status?: ReservationStatus
        } = {}

        if (data.reservation_status !== undefined) {
            if (!ReservationStateMachine.isValidStatus(data.reservation_status)) {
                throw new Error("Invalid reservation status")
            }
            await this.updateStatus(id, data.reservation_status)

            update_data.reservation_status = data.reservation_status
        }

        const updated_reservation_count = await Reservation.update(update_data,
            { where: { id } }
        )

        return updated_reservation_count
    }

    static async delete(id: number) {
        return await sequelize.transaction(async transaction => {
            const reservation = await Reservation.findByPk(id, {
                transaction,
                lock: transaction.LOCK.UPDATE
            })

            if (!reservation) return 0

            const status = reservation.get('reservation_status')
            if (status !== 'expired' && status !== 'completed') {
                throw new ReservationNotDeletableError()
            }

            const reservationBooks = await ReservationBook.findAll({
                where: { reservation_id: id },
                attributes: ['book_id'],
                transaction
            })
            const bookIds = reservationBooks.map(item => item.get('book_id') as number)

            await ReservationBook.destroy({
                where: { reservation_id: id },
                transaction
            })

            if (bookIds.length > 0) {
                await Book.update(
                    { is_booked: false },
                    { where: { id: bookIds }, transaction }
                )
            }

            return await Reservation.destroy({
                where: { id },
                transaction
            })
        })
    }

    // actualiza el reservation_status con la maquina de estados  
    static async updateStatus(id: number, nextStatus: ReservationStatus) {
        const reservation = await this.getById(id)

        if (!reservation) {
            throw new Error(`Reservation with id ${id} don't exists`)
        }
        const current_status = reservation.get('reservation_status') as ReservationStatus

        ReservationStateMachine.validateTransition(current_status, nextStatus)
    }

    static async clientReservations(id: number) {
        const reservations = await Reservation.count({
            where: { client_id: id }
        })

        return reservations
    }

    static async staffReservations(id: number) {
        const reservations = await Reservation.count({
            where: { staff_id: id }
        })

        return reservations
    }

}
import Reservation from "./reservation.model.ts";
import type { ReservationCreate, ReservationUpdate } from "./reservation.types.ts";
import { ReservationStateMachine } from "./reservation_state_machine.ts";
import type { ReservationStatus } from "./reservation_status.ts";

export class ReservationRepository {
    static async getAll() {
        return await Reservation.findAll({
            include: [
                {
                    association: 'books',
                    attributes: ["title", "publish_date", "is_booked"],
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

    static async getById(id: Number) {
        const reservation = await Reservation.findOne({
            where: { id },
            include: [
                {
                    association: 'books',
                    attributes: ["title", "publish_date", "is_booked"],
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

    static async update(id: Number, data: ReservationUpdate) {
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

    static async delete(id: Number) { // TODO: solo eliminar si el status en 'completed'. O no es necesario
        return await Reservation.destroy({
            where: { id }
        })
    }

    // actualiza el reservation_status con la maquina de estados  
    static async updateStatus(id: Number, nextStatus: ReservationStatus) {
        const reservation = await this.getById(id)

        if (!reservation) {
            throw new Error(`Reservation with id ${id} don't exists`)
        }
        const current_status = reservation.get('reservation_status') as ReservationStatus

        ReservationStateMachine.validateTransition(current_status, nextStatus)
    }

    static async clientReservations(id: Number) {
        const reservations = await Reservation.count({
            where: { client_id: id }
        })

        return reservations
    }

    static async staffReservations(id: Number) {
        const reservations = await Reservation.count({
            where: { staff_id: id }
        })

        return reservations
    }

}
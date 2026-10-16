import Reservation from "./reservation.model.ts";

export class ReservationRepository {
    static async getAll() {
        return await Reservation.findAll()
    }
}
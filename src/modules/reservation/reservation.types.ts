import type { ReservationStatus } from "./reservation_status.ts"

export type Reservation = {
    id: Number,
    client_id: Number,
    staff_id: Number,
    start_date: Date,
    expiry_date: Date,
    reservation_status: ReservationStatus
}

export type ReservationCreate = Omit<Reservation, 'id' | 'reservation_status' | 'start_date'>
export type ReservationUpdate = Partial<Omit<Reservation, 'id' | 'start_date' | 'client_id' | 'staff_id'>>


//export type ReservationStatus = 'pending' | 'active' | 'cancelled' | 'completed' | 'expired' 

// maquina de estados finitos
export const ReservationStatus = {
    PENDING: 'pending',
    ACTIVE: 'active',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    EXPIRED: 'expired'
} as const

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus] // esto es lo mismo que esta en la linea 1

export const status_transitions: Record<ReservationStatus, readonly ReservationStatus[]> = {
    pending: ['active', 'cancelled', 'expired'],
    active: ['expired', 'completed'],
    completed: [],
    cancelled: [],
    expired: []
}
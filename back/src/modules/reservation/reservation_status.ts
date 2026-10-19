//export type ReservationStatus = 'pending' | 'active' | 'cancelled' | 'completed' | 'expired' 

// maquina de estados finitos
export const ReservationStatus = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    EXPIRED: 'expired'
} as const

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus] // esto es lo mismo que esta en la linea 1

export const status_transitions: Record<ReservationStatus, readonly ReservationStatus[]> = {
    active: ['expired', 'completed'],
    completed: [],
    expired: [] // si se pasa de los 15 dias
}
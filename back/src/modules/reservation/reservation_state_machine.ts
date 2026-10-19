import { ReservationStatus, status_transitions } from "./reservation_status.js";

export class ReservationStateMachine {
    static isValidStatus(status: unknown): status is ReservationStatus {
        return (
            typeof status === "string" && Object.values(ReservationStatus).includes(status as ReservationStatus)
        )
    }

    static canTransition(current: ReservationStatus, next: ReservationStatus) {
        if (current == next) return true

        return status_transitions[current]?.includes(next) ?? false
    }

    static validateTransition(current: ReservationStatus, next: ReservationStatus) {
        if (!this.canTransition(current, next)) {
            throw new Error(`Invalid transition: ${current} -> ${next}`)
        }
    }
}
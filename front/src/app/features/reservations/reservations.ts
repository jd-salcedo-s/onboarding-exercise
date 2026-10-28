import { afterNextRender, Component, inject, signal } from "@angular/core";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { RouterLink } from "@angular/router";
import { Reservation, ReservationService } from "./reservations.service";

@Component({
    selector: 'app-reservations',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './reservations.html'
})
export class ReservationsComponent {
    private reservationService = inject(ReservationService)

    reservations = signal<Reservation[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'start_date', label: 'Start Date' },
        { key: 'expiry_date', label: 'Expiry Date' },
        { key: 'reservation_status', label: 'Status' },
        { key: 'bookTitles', label: 'Books' },
        { key: 'staff.username', label: 'Staff Username' },
        { key: 'client.name', label: 'Client Name' },
        { key: 'client.email', label: 'Client Email' }
    ]
    constructor() {
        afterNextRender(() => {
            this.loadReservations()
        })
    }

    private loadReservations(): void {
        this.reservationService.getAll().subscribe({
            next: reservations => {
                this.reservations.set(
                    reservations.map(reservation => ({
                        ...reservation,
                        bookTitles: reservation.books.map(book => book.title).join(', ')
                    }))
                )
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load reservations')
                this.loading.set(false)
            }
        })
    }
}
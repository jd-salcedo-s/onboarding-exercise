import { afterNextRender, Component, inject, signal } from "@angular/core";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { RouterLink } from "@angular/router";
import { Client, ClientService } from "./clients.service";

@Component({
    selector: 'app-clients',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './clients.html'
})
export class ClientComponent {
    private clientService = inject(ClientService)

    clients = signal<Client[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'phone_number', label: 'Phone Number' },
        { key: 'email', label: 'Email' },
    ]
    constructor() {
        afterNextRender(() => {
            this.loadClients()
        })
    }

    private loadClients(): void {
        this.clientService.getAll().subscribe({
            next: clients => {
                this.clients.set(clients)
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load clients')
                this.loading.set(false)
            }
        })
    }
}
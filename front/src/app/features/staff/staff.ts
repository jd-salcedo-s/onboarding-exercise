import { afterNextRender, Component, inject, signal } from "@angular/core";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { RouterLink } from "@angular/router";
import { Staff, StaffService } from "./staff.service";

@Component({
    selector: 'app-staff',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './staff.html'
})
export class StaffComponent {
    private staffService = inject(StaffService)

    staff = signal<Staff[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
    ]
    constructor() {
        afterNextRender(() => {
            this.loadStaffs()
        })
    }

    private loadStaffs(): void {
        this.staffService.getAll().subscribe({
            next: staff => {
                this.staff.set(staff)
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load staff')
                this.loading.set(false)
            }
        })
    }
}
import { ChangeDetectorRef, Component, Input, ViewChild, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatIconModule } from "@angular/material/icon"
import { FormsModule } from "@angular/forms"
import { FormContainerComponent } from "../form-container/form-container.component"
import { AuthService } from "../../core/auth.service"

export interface TableColumn {
    key: string
    label: string
}

type EntityType = 'author' | 'book' | 'client' | 'genre' | 'reservation' | 'staff'

interface EditField {
    key: string
    label: string
    type?: string
    options?: SelectOption[]
    min?: number
    step?: number
    required?: boolean
    optional?: boolean
}

interface SelectOption {
    value: string | number
    label: string
}

interface NamedRecord {
    id: number
    name?: string
    description?: string
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, FormsModule, FormContainerComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent {
    private readonly http = inject(HttpClient)
    private readonly authService = inject(AuthService)
    private readonly changeDetector = inject(ChangeDetectorRef)
    @Input({ required: true }) columns: TableColumn[] = []
    @Input({ required: true }) entityType!: EntityType

    activeAction: 'create' | 'update' | 'delete' | null = null
    activeRow: Record<string, unknown> | null = null
    editValues: Record<string, unknown> = {}
    actionError = ''
    actionLoading = false

    private readonly fieldsByEntity: Record<EntityType, EditField[]> = {
        author: [{ key: 'name', label: 'Name', required: true }],
        book: [
            { key: 'author_id', label: 'Author', type: 'select', required: true, options: [] },
            { key: 'genre_id', label: 'Genre', type: 'select', required: true, options: [] },
            { key: 'title', label: 'Title', required: true },
            { key: 'publish_date', label: 'Publish Date', type: 'date', optional: true }
        ],
        client: [
            { key: 'name', label: 'Name', required: true },
            { key: 'phone_number', label: 'Phone Number', optional: true },
            { key: 'email', label: 'Email', type: 'email', optional: true }
        ],
        genre: [{ key: 'description', label: 'Description', required: true }],
        reservation: [{
            key: 'reservation_status',
            label: 'Status',
            type: 'select',
            options: ['active', 'completed', 'expired'].map(value => ({ value, label: value }))
        }],
        staff: [
            { key: 'name', label: 'Name', required: true },
            { key: 'username', label: 'Username', required: true },
            { key: 'password', label: 'New Password', type: 'password' },
            { key: 'role', label: 'Role', type: 'select', options: ['admin', 'staff'].map(value => ({ value, label: value })) }
        ]
    }

    private readonly reservationCreateFields: EditField[] = [
        { key: 'client_id', label: 'Client', type: 'select', required: true, options: [] },
        { key: 'staff_id', label: 'Staff', type: 'select', required: true, options: [] },
        { key: 'books_ids', label: 'Book IDs (comma separated)', required: true }
    ]

    get editFields(): EditField[] {
        return this.fieldsByEntity[this.entityType]
    }

    get createFields(): EditField[] {
        if (this.entityType === 'reservation') return this.reservationCreateFields
        if (this.entityType === 'staff') return [
            { key: 'name', label: 'Name', required: true },
            { key: 'username', label: 'Username', required: true },
            { key: 'password', label: 'Password', type: 'password', required: true },
            { key: 'role', label: 'Role', type: 'select', options: ['admin', 'staff'].map(value => ({ value, label: value })), required: true }
        ]
        return this.editFields
    }

    openCreate() {
        this.activeAction = 'create'
        this.activeRow = null
        this.editValues = Object.fromEntries(this.createFields.map(field => [field.key, field.type === 'checkbox' ? false : '']))
        if (this.entityType === 'book') this.loadBookOptions()
        if (this.entityType === 'reservation') this.loadReservationOptions()
    }

    openAction(action: 'update' | 'delete', row: object) {
        this.activeAction = action
        this.activeRow = row as Record<string, unknown>
        this.editValues = Object.fromEntries(
            this.editFields.map(field => [
                field.key,
                field.key === 'password' ? '' : this.getCellValue(row, field.key) ?? ''
            ])
        )
        if (this.entityType === 'book') this.loadBookOptions()
    }

    private loadBookOptions() {
        const token = this.authService.getToken()
        if (!token) return
        const headers = { Authorization: `Bearer ${token}` }
        this.http.get<NamedRecord[]>('http://localhost:3000/library/author', { headers }).subscribe({
            next: authors => {
                const field = this.fieldsByEntity.book.find(item => item.key === 'author_id')
                if (field) field.options = authors.map(author => ({ value: author.id, label: author.name ?? `Author ${author.id}` }))
                this.changeDetector.markForCheck()
            },
            error: () => this.setActionError('Could not load authors.')
        })
        this.http.get<NamedRecord[]>('http://localhost:3000/library/genre', { headers }).subscribe({
            next: genres => {
                const field = this.fieldsByEntity.book.find(item => item.key === 'genre_id')
                if (field) field.options = genres.map(genre => ({ value: genre.id, label: genre.description ?? `Genre ${genre.id}` }))
                this.changeDetector.markForCheck()
            },
            error: () => this.setActionError('Could not load genres.')
        })
    }

    private loadReservationOptions() {
        const token = this.authService.getToken()
        if (!token) return
        const headers = { Authorization: `Bearer ${token}` }
        this.http.get<NamedRecord[]>('http://localhost:3000/library/client', { headers }).subscribe({
            next: clients => {
                const field = this.reservationCreateFields.find(item => item.key === 'client_id')
                if (field) field.options = clients.map(client => ({
                    value: client.id,
                    label: client.name ?? `Client ${client.id}`
                }))
                this.changeDetector.markForCheck()
            },
            error: () => this.setActionError('Could not load clients.')
        })
        this.http.get<NamedRecord[]>('http://localhost:3000/staff', { headers }).subscribe({
            next: staff => {
                const field = this.reservationCreateFields.find(item => item.key === 'staff_id')
                if (field) field.options = staff.map(member => ({
                    value: member.id,
                    label: member.name ?? `Staff ${member.id}`
                }))
                this.changeDetector.markForCheck()
            },
            error: () => this.setActionError('Could not load staff.')
        })
    }

    submitCreate() {
        if (this.actionLoading) return
        const token = this.authService.getToken()
        if (!token) {
            this.actionError = 'Your session has expired. Please sign in again.'
            return
        }

        const payload: Record<string, unknown> = {}
        for (const field of this.createFields) {
            const value = this.editValues[field.key]
            if (field.optional && (value === '' || value === null || value === undefined)) continue
            if (field.key === 'books_ids') {
                const ids = String(value).split(',').map(id => Number(id.trim()))
                if (!ids.length || ids.some(id => !Number.isInteger(id) || id <= 0)) {
                    this.actionError = 'Enter valid book IDs separated by commas.'
                    return
                }
                payload[field.key] = ids
            } else {
                payload[field.key] = field.type === 'number' ? Number(value) : value
            }
        }
        this.actionLoading = true
        this.actionError = ''
        this.http.post(this.createEndpoint(), payload, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: created => {
                if (this.entityType === 'reservation') {
                    const reservationId = (created as Record<string, unknown>)['id']
                    if (typeof reservationId !== 'number') {
                        this.setActionError('Reservation was created, but its details could not be loaded.')
                        return
                    }
                    this.http.get<Record<string, unknown>>(`${this.createEndpoint()}/${reservationId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).subscribe({
                        next: reservation => {
                            const books = Array.isArray(reservation['books'])
                                ? reservation['books'] as Record<string, unknown>[]
                                : []
                            const tableRow = {
                                ...reservation,
                                bookTitles: books.map(book => book['title']).filter(Boolean).join(', ')
                            }
                            this.dataSource.data = [...this.dataSource.data, tableRow]
                            this.closeAction()
                        },
                        error: () => this.setActionError('Reservation was created, but its details could not be loaded.')
                    })
                    return
                }

                if (this.entityType !== 'staff') this.dataSource.data = [...this.dataSource.data, created as object]
                this.closeAction()
            },
            error: error => {
                const details = error.error?.details
                this.setActionError(Array.isArray(details)
                    ? details.join(' ')
                    : error.error?.message ?? 'Could not create this record.')
            }
        })
    }

    closeAction() {
        this.activeAction = null
        this.activeRow = null
        this.actionError = ''
        this.actionLoading = false
        this.changeDetector.markForCheck()
    }

    private setActionError(message: string) {
        this.actionError = message
        this.actionLoading = false
        this.changeDetector.markForCheck()
    }

    submitUpdate() {
        if (!this.activeRow || this.actionLoading) return
        const id = this.activeRow['id']
        if (typeof id !== 'number' || id <= 0) {
            this.actionError = 'This record has no valid ID.'
            return
        }

        const token = this.authService.getToken()
        if (!token) {
            this.actionError = 'Your session has expired. Please sign in again.'
            return
        }

        const payload: Record<string, unknown> = {}
        for (const field of this.editFields) {
            const value = this.editValues[field.key]
            if (field.optional && (value === '' || value === null || value === undefined)) continue
            if (field.key === 'password' && (typeof value !== 'string' || !value.trim())) continue
            if (this.entityType === 'staff' && value === this.activeRow[field.key]) continue
            payload[field.key] = field.type === 'number' ? Number(value) : value
        }

        this.actionLoading = true
        this.actionError = ''
        this.http.patch(this.endpoint(id), payload, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: () => {
                this.dataSource.data = this.dataSource.data.map(row =>
                    row === this.activeRow ? { ...row, ...payload } : row
                )
                this.closeAction()
            },
            error: error => {
                const details = error.error?.details
                this.setActionError(Array.isArray(details)
                    ? details.join(' ')
                    : error.error?.message ?? 'Could not update this record.')
            }
        })
    }

    submitDelete() {
        if (!this.activeRow || this.actionLoading) return
        const id = this.activeRow['id']
        if (typeof id !== 'number' || id <= 0) {
            this.actionError = 'This record has no valid ID.'
            return
        }

        const token = this.authService.getToken()
        if (!token) {
            this.actionError = 'Your session has expired. Please sign in again.'
            return
        }

        this.actionLoading = true
        this.actionError = ''
        this.http.delete(this.endpoint(id), {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: () => {
                this.dataSource.data = this.dataSource.data.filter(row => row !== this.activeRow)
                this.closeAction()
            },
            error: error => {
                this.setActionError(error.error?.message ?? 'Could not delete this record.')
            }
        })
    }

    private endpoint(id: number) {
        const baseUrl = this.entityType === 'staff'
            ? 'http://localhost:3000/staff'
            : `http://localhost:3000/library/${this.entityType}`
        return `${baseUrl}/${id}`
    }

    private createEndpoint() {
        if (this.entityType === 'staff') return 'http://localhost:3000/signup'
        return `http://localhost:3000/library/${this.entityType}`
    }

    dataSource = new MatTableDataSource<object>([])

    @Input({ required: true })
    set data(rows: object[]) {
        this.dataSource.data = rows
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
    }

    get displayedColumns() {
        return [...this.columns.map(c => c.key), 'actions']
    }

    getCellValue(row: object, key: string) {
        return key.split('.').reduce<unknown>((value, property) => {
            if (value !== null && typeof value === 'object') {
                return (value as Record<string, unknown>)[property]
            }

            return undefined
        }, row)
    }
}

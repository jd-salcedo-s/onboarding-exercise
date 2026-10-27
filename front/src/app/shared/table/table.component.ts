import { Component, Input, ViewChild } from "@angular/core"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"

export interface TableColumn {
    key: string
    label: string
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent {
    @Input({ required: true }) columns: TableColumn[] = []

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
        return this.columns.map(c => c.key)
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
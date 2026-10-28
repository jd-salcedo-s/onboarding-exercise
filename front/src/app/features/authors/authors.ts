import { afterNextRender, Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { Author, AuthorService } from "./authors.service";

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './authors.html'
})
export class AuthorsComponent {
    private authorService = inject(AuthorService)

    authors = signal<Author[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' }
    ]
    constructor() {
        afterNextRender(() => {
            this.loadAuthors()
        })
    }

    private loadAuthors() {
        this.authorService.getAll().subscribe({
            next: authors => {
                this.authors.set(authors)
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load authors')
                this.loading.set(false)
            }
        })
    }
}
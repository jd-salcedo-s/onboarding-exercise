import { afterNextRender, Component, inject, signal } from "@angular/core";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { RouterLink } from "@angular/router";
import { Book, BookService } from "./book.service";

@Component({
    selector: 'app-books',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './books.html'
})
export class BooksComponent {
    private bookService = inject(BookService)

    books = signal<Book[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'title', label: 'Title' },
        { key: 'author.name', label: 'Author' },
        { key: 'publish_date', label: 'Publish Date' },
    ]
    constructor() {
        afterNextRender(() => {
            this.loadBooks()
        })
    }

    private loadBooks(): void {
        this.bookService.getAll().subscribe({
            next: books => {
                this.books.set(books)
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load books')
                this.loading.set(false)
            }
        })
    }
}
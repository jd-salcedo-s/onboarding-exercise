import { afterNextRender, Component, inject, signal } from "@angular/core";
import { TableColumn, TableComponent } from "../../shared/table/table.component";
import { RouterLink } from "@angular/router";
import { Genre, GenreService } from "./genre.service";

@Component({
    selector: 'app-genres',
    standalone: true,
    imports: [TableComponent, RouterLink],
    templateUrl: './genres.html'
})
export class GenreComponent {
    private genreService = inject(GenreService)

    genres = signal<Genre[]>([])
    loading = signal(true)
    error = signal('')

    columns: TableColumn[] = [
        { key: 'description', label: 'Description' }
    ]
    constructor() {
        afterNextRender(() => {
            this.loadGenres()
        })
    }

    private loadGenres(): void {
        this.genreService.getAll().subscribe({
            next: genres => {
                this.genres.set(genres)
                this.loading.set(false)
            },
            error: error => {
                this.error.set('Could not load genres')
                this.loading.set(false)
            }
        })
    }
}
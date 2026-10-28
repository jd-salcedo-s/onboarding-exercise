import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../core/auth.service";

export interface Book {
    id: number
    author_id: number
    genre_id: number
    title: string
    publish_date: string
    is_booked: boolean
    author?: {
        name: string
    }
}
@Injectable({
    providedIn: 'root'
})
export class BookService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/library/book'
    private authService = inject(AuthService)

    getAll(): Observable<Book[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Book[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
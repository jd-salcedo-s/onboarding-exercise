import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../core/auth.service";

export interface Genre {
    description: string
}
@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/library/genre'
    private authService = inject(AuthService)

    getAll(): Observable<Genre[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Genre[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Observable, throwError } from "rxjs";

export interface Author {
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/library/author'
    private authService = inject(AuthService)

    getAll(): Observable<Author[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Author[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
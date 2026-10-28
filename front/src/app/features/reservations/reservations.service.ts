import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../core/auth.service";

export interface Reservation {
    start_date: string
    expiry_date: string
    reservation_status: string
    books: {
        title: string
    }[]
    staff?: {
        username: string
    }
    client?: {
        name: string
        email: string
    }
}
@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/library/reservation'
    private authService = inject(AuthService)

    getAll(): Observable<Reservation[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Reservation[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../core/auth.service";

export interface Client {
    name: string
    phone_number: string
    email: string
}
@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/library/client'
    private authService = inject(AuthService)

    getAll(): Observable<Client[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Client[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
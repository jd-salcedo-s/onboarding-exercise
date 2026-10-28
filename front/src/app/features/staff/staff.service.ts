import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../core/auth.service";

export interface Staff {
    name: string
    username: string
    status: boolean
    role: string
}
@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000/staff'
    private authService = inject(AuthService)

    getAll(): Observable<Staff[]> {
        const token = this.authService.getToken()

        if (!token) {
            return throwError(() => new Error('No authentication token found'))
        }
        return this.http.get<Staff[]>(this.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
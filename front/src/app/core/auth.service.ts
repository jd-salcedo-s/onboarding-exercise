import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { tap } from "rxjs";

interface LoginData {
    username: string
    password: string
}
interface LoginResponse {
    token?: string
}
interface SignupData {
    name: string
    username: string
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient)
    private url = 'http://localhost:3000'
    private platformId = inject(PLATFORM_ID)

    login(data: LoginData) {
        return this.http.post<LoginResponse>(`${this.url}/login`, data)
            .pipe(
                tap(response => {
                    if (typeof response.token !== 'string' || !response.token.trim()) {
                        throw new Error('The API did not return a token')
                    }

                    localStorage.setItem('token', response.token)
                })
            )
    }

    signup(data: SignupData) {
        return this.http.post<LoginResponse>(`${this.url}/signup`, data)
            .pipe(
                tap(response => {
                    if (typeof response.token !== 'string' || !response.token.trim()) {
                        throw new Error('The API did not return a token')
                    }

                    localStorage.setItem('token', response.token)
                })
            )
    }

    getToken() {
        if (!isPlatformBrowser(this.platformId)) {
            return null
        }

        return localStorage.getItem('token')
    }

    clearToken() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token')
        }
    }
}
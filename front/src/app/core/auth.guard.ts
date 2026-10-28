import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    const token = authService.getToken()

    if (token) return true

    return router.createUrlTree(['/login'])
}

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router)
    const role = getRoleFromToken()

    if (role !== 'admin') return router.createUrlTree(['/unauthorized'])

    return true
}

function getTokenPayload(token: string) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch {
        return null;
    }
}

export function getRoleFromToken() {
    const authService = inject(AuthService)
    const token = authService.getToken()!
    const payload = getTokenPayload(token)
    const role = payload?.role

    return role
} 
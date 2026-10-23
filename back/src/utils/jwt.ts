import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret"
const JWT_EXPIRY: SignOptions["expiresIn"] = "8h"

export function generateToken(staffId: number, role: string) {
    return jwt.sign({ staffId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

export function validateToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}
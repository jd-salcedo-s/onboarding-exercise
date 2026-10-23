import type { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt.ts";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({
        message: 'Authentication token required'
    })

    const token = authHeader.split(' ')[1]
    try {
        const decoded = validateToken(token)
        req.user = {
            id: decoded.staffId
        }
        next()
    } catch {
        return res.status(400).json({
            message: 'Invalid or expired token'
        })
    }
}
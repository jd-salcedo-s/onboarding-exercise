import type { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt.ts";
import { existsOnBlacklist } from "../utils/blacklist_file.ts";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({
        message: 'Authentication token required'
    })

    const token = authHeader.split(' ')[1]

    if (await existsOnBlacklist(token)) return res.status(400).json({
        message: 'Invalid token'
    })

    try {
        const decoded = validateToken(token)
        req.user = {
            id: decoded.staffId,
            role: decoded.role
        }
        req.token = token
        next()
    } catch {
        return res.status(400).json({
            message: 'Invalid or expired token'
        })
    }
}
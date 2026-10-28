import 'dotenv/config'
import express from "express"
import { staffRouter } from './modules/staff/staff.routes.ts'
import './models/models_relations.ts'
import { libraryRouter } from './modules/library.routes.ts'
import { authMiddleware } from './middlewares/auth.middleware.ts'
import { credentialsRouter } from './modules/credentials.routes.ts'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

const app = express()
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

/* const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
}); */
const publicLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,             // 10 requests per IP per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
})

/* app.use(limiter) */
app.use(express.json())

app.use('/', publicLimiter, credentialsRouter)
app.use('/staff', authMiddleware, staffRouter)
app.use('/library', authMiddleware, libraryRouter)

const PORT = process.env.PORT ?? 3000

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`api listening on port ${PORT}`)
})
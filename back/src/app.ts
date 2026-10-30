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

const publicLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
})

app.use(express.json())

app.use(['/login', '/signup'], publicLimiter)
app.use('/', credentialsRouter)
app.use('/staff', authMiddleware, staffRouter)
app.use('/library', authMiddleware, libraryRouter)

const PORT = process.env.PORT ?? 3000

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`api listening on port ${PORT}`)
})

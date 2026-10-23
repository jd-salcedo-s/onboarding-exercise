import 'dotenv/config'
import express from "express"
import { staffRouter } from './modules/staff/staff.routes.ts'
import './models/models_relations.ts'
import { libraryRouter } from './modules/library.routes.ts'
import { authMiddleware } from './middlewares/auth.middleware.ts'

const app = express()
app.use(express.json())

app.use('/staff', staffRouter)
app.use('/library', authMiddleware, libraryRouter)

const PORT = process.env.PORT ?? 3000

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`api listening on port ${PORT}`)
})
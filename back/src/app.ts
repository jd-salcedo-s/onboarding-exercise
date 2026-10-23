import 'dotenv/config'
import express from "express"
import { staffRouter } from './modules/staff/staff.routes.ts'
import './models/models_relations.ts'
import { libraryRouter } from './modules/library.routes.ts'

const app = express()
app.use(express.json())

// AUTHORIZATION MIDDLEWARE
// auth login signup logout
app.use('/staff', staffRouter)
app.use('/library', libraryRouter)

const PORT = process.env.PORT ?? 3000

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`api listening on port ${PORT}`)
})
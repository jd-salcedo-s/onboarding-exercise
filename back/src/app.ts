import 'dotenv/config'
import express from "express"
import { genreRouter } from './modules/genre/genre.routes.ts'
import { authorRouter } from './modules/author/author.routes.ts'
import { staffRouter } from './modules/staff/staff.routes.ts'
import { bookRouter } from './modules/book/book.routes.ts'
import { reservationRouter } from './modules/reservation/reservation.routes.ts'
import { clientRouter } from './modules/client/client.routes.ts'
import './models/models_relations.ts'

const app = express()
app.use(express.json())

// AUTHORIZATION MIDDLEWARE

app.use('/genre', genreRouter)
app.use('/author', authorRouter)
app.use('/client', clientRouter)
app.use('/staff', staffRouter)
app.use('/reservations', reservationRouter)
app.use('/book', bookRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
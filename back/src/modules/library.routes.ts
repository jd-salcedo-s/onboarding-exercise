import { Router } from "express";
import { authorRouter } from "./author/author.routes.ts";
import { bookRouter } from "./book/book.routes.ts";
import { clientRouter } from "./client/client.routes.ts";
import { genreRouter } from "./genre/genre.routes.ts";
import { reservationRouter } from "./reservation/reservation.routes.ts";

export const libraryRouter = Router()

libraryRouter.use('/genre', genreRouter)
libraryRouter.use('/author', authorRouter)
libraryRouter.use('/client', clientRouter)
libraryRouter.use('/reservations', reservationRouter)
libraryRouter.use('/book', bookRouter)
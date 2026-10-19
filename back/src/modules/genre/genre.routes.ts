import { Router } from "express";
import { GenreController } from "./genre.controller.ts";

export const genreRouter = Router()

genreRouter.get('/', GenreController.getAll)
genreRouter.get('/:id', GenreController.getById)
genreRouter.post('/', GenreController.create)
genreRouter.patch('/:id', GenreController.update)
genreRouter.delete('/:id', GenreController.delete)
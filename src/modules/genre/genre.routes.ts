import { Router } from "express";
import { GenreController } from "./genre.controller.ts";

export const genreRouter = Router()

genreRouter.get('/', GenreController.getAll)
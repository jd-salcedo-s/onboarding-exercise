import { Router } from "express";
import { AuthorController } from "./author.controller.ts";

export const authorRouter = Router()

authorRouter.get('/', AuthorController.getAll)
authorRouter.get('/:id', AuthorController.getById)
authorRouter.post('/', AuthorController.create)
authorRouter.patch('/:id', AuthorController.update)
authorRouter.delete('/:id', AuthorController.delete)
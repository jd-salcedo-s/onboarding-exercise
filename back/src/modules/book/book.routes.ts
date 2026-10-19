import { Router } from "express";
import { BookController } from "./book.controller.ts";

export const bookRouter = Router()

bookRouter.get('/', BookController.getAll)
bookRouter.get('/:id', BookController.getById)
bookRouter.post('/', BookController.create)
bookRouter.patch('/:id', BookController.update)
bookRouter.delete('/:id', BookController.delete)
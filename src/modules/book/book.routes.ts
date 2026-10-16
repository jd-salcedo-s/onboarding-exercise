import { Router } from "express";
import { BookController } from "./book.controller.ts";

export const bookRouter = Router()

bookRouter.get('/', BookController.getAll)
import { Router } from "express";
import { AuthorController } from "./author.controller.ts";

export const authorRouter = Router()

authorRouter.get('/', AuthorController.getAll)
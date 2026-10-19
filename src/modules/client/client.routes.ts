import { Router } from "express";
import { ClientController } from "./client.controller.ts";

export const clientRouter = Router()

clientRouter.get('/', ClientController.getAll)
clientRouter.get('/:id', ClientController.getById)
clientRouter.post('/', ClientController.create)
clientRouter.patch('/:id', ClientController.update)
clientRouter.delete('/:id', ClientController.delete)
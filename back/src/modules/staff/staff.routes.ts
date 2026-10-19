import { Router } from "express";
import { StaffController } from "./staff.controller.ts";

export const staffRouter = Router()

staffRouter.get('/', StaffController.getAll)
staffRouter.get('/:id', StaffController.getById)
staffRouter.post('/', StaffController.create)
staffRouter.patch('/:id', StaffController.update)
staffRouter.delete('/:id', StaffController.delete)
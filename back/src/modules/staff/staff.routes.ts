import { Router } from "express";
import { StaffController } from "./staff.controller.ts";

export const staffRouter = Router()

staffRouter.get('/', StaffController.getAll)
staffRouter.get('/:id', StaffController.getById)
staffRouter.patch('/:id', StaffController.update)
staffRouter.delete('/:id', StaffController.delete)

staffRouter.post('/login', StaffController.login)
staffRouter.post('/signup', StaffController.signup)

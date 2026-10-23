import { Router } from "express";
import { StaffController } from "./staff/staff.controller.ts";

export const credentialsRouter = Router()

credentialsRouter.post('/login', StaffController.login)
credentialsRouter.post('/signup', StaffController.signup)
import { Router } from "express";
import { StaffController } from "./staff.controller.ts";

export const staffRouter = Router()

staffRouter.get('/', StaffController.getAll)
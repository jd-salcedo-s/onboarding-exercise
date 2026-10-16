import { Router } from "express";
import { ClientController } from "./client.controller.ts";

export const clientRouter = Router()

clientRouter.get('/', ClientController.getAll)
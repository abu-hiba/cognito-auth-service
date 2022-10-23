import express from "express"
import * as Controller from "./auth.controller"
import { validateRequest } from "../validation/validation.middleware"
import * as Schema from "../validation/validation.schema"

export const authRouter = express.Router()

authRouter.post('/signup', validateRequest(Schema.signUp), Controller.signUp)

authRouter.post('/confirm', validateRequest(Schema.confirmSignUp), Controller.confirmSignUp)

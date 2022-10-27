import express from "express"
import controller from "./auth.controller"
import { validateRequestBody } from "../validation/validation.middleware"
import schema from "../validation/validation.schema"

export const authRouter = express.Router()

authRouter.post('/signup', validateRequestBody(schema.signUp), controller.signUp)

authRouter.post('/confirm', validateRequestBody(schema.confirmSignUp), controller.confirmSignUp)

authRouter.post('/resend-code', validateRequestBody(schema.resendConfirmationCode), controller.resendConfirmationCode)

authRouter.post('/signin', validateRequestBody(schema.signIn), controller.signIn)

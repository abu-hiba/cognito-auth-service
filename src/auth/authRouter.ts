import express from "express"
import controller from "./authController"
import validation, { validateRequestBody } from "../validation"

export const authRouter = express.Router()

authRouter.post('/signup', validateRequestBody(validation.signUp), controller.signUp)

authRouter.post('/confirm', validateRequestBody(validation.confirmSignUp), controller.confirmSignUp)

authRouter.post('/resend-code', validateRequestBody(validation.resendConfirmationCode), controller.resendConfirmationCode)

authRouter.post('/signin', validateRequestBody(validation.signIn), controller.signIn)

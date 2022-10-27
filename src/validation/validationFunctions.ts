import Ajv from "ajv"
import { confirmSignUpSchema, resendConfirmationCodeSchema, signInSchema, signUpSchema } from "./validationSchema"

const ajv = new Ajv()

export const signUp = ajv.compile(signUpSchema)
export const confirmSignUp = ajv.compile(confirmSignUpSchema)
export const resendConfirmationCode = ajv.compile(resendConfirmationCodeSchema)
export const signIn = ajv.compile(signInSchema)

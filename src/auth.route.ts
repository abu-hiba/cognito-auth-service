import express from "express"
import * as controller from "./auth.controller"

export const router = express.Router()

router.post('/signup', controller.signUp)

router.post('/confirm', controller.confirmSignUp)

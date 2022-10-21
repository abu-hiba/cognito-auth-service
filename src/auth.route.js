import express from "express"
import * as controller from "./auth.controller.js"

export const router = express.Router()

router.post('/signup', controller.signUp)

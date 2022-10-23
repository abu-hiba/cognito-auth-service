import { Handler } from 'express'
import * as Auth from './auth.service'

export const signUp: Handler = async (req, res, next) => {
    try {
        const data = await Auth.signUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

export const confirmSignUp: Handler = async (req, res, next) => {
    try {
        const data = await Auth.confirmSignUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error confirming user: ${error}`)
        next(error)
    }
}

export const resendConfirmationCode: Handler = async (req, res, next) => {
    try {
        const data = await Auth.resendConfirmationCode(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error resending confirmation code: ${error}`)
        next(error)
    }
}

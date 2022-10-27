import type { Handler } from 'express'
import Auth from './authService'

const signUp: Handler = async (req, res, next) => {
    try {
        const data = await Auth.signUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

const confirmSignUp: Handler = async (req, res, next) => {
    try {
        const data = await Auth.confirmSignUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error confirming user: ${error}`)
        next(error)
    }
}

const resendConfirmationCode: Handler = async (req, res, next) => {
    try {
        const data = await Auth.resendConfirmationCode(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error resending confirmation code: ${error}`)
        next(error)
    }
}

const signIn: Handler = async (req, res, next) => {
    try {
        const data = await Auth.signIn(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error authorising user: ${error}`)
        next(error)
    }
}

export default {
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    signIn,
}

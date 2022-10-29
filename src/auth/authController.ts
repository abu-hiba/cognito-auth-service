import type { Handler } from 'express'
import Auth from './authService'

const signUp: Handler = async (req, res, next) => {
    try {
        await Auth.signUp(req.body)
        res.json({ emailSent: true })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

const confirmSignUp: Handler = async (req, res, next) => {
    try {
        await Auth.confirmSignUp(req.body)
        res.json({ username: req.body.username })
    } catch (error) {
        console.error(`Error confirming user: ${error}`)
        next(error)
    }
}

const resendConfirmationCode: Handler = async (req, res, next) => {
    try {
        await Auth.resendConfirmationCode(req.body)
        res.json({ emailSent: true })
    } catch (error) {
        console.error(`Error resending confirmation code: ${error}`)
        next(error)
    }
}

const signIn: Handler = async (req, res, next) => {
    try {
        console.log(process.env.NODE_ENV)
        const { AuthenticationResult } = await Auth.signIn(req.body)
        res.cookie("cognito_access", AuthenticationResult?.AccessToken, { maxAge: 60*1000, httpOnly: process.env.NODE_ENV !== 'production' });
        res.json({ username: req.body.username })
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

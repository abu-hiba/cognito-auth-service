import type { Handler } from 'express'
import { SessionData } from 'express-session'
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
    const { session, body } = req
    try {
        const { AuthenticationResult } = await Auth.signIn(req.body)
        session.userName = body.username
        session.refreshToken = AuthenticationResult?.RefreshToken
        session.accessToken = AuthenticationResult?.AccessToken 
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

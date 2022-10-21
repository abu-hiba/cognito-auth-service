import * as Auth from './auth.service.js'

export const signUp = async (req, res, next) => {
    try {
        const data = await Auth.signUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

export const confirmSignUp = async (req, res, next) => {
    try {
        const data = await Auth.confirmSignUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error confirming user: ${error}`)
        next(error)
    }
}

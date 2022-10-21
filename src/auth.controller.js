import * as Auth from './auth.service.js'

export const signUp = async (req, res, next) => {
    try {
        const user = await Auth.signUp(req.body.userParams)
        res.json({ user })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

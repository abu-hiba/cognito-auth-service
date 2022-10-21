import { NextFunction, Request, Response } from 'express'
import * as Auth from './auth.service'

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Auth.signUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error signing up user: ${error}`)
        next(error)
    }
}

export const confirmSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Auth.confirmSignUp(req.body)
        res.json({ data })
    } catch (error) {
        console.error(`Error confirming user: ${error}`)
        next(error)
    }
}

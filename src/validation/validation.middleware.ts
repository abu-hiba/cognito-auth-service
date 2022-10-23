import { Handler } from "express"
import Joi from "joi"

export const validateRequest = (schema: Joi.Schema, property: 'body' | 'query' = 'body'): Handler => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property])

        if (error) {
            console.log(`Invalid request: ${error}`)
            res.status(422).json({ error })
        } else {
            next()
        }
    }
}

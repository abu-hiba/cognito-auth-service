import type { Handler } from "express"
import type { Schema } from "joi"

type RequestProperty = "body" | "query" | "params"

const validateRequest = (property: RequestProperty) => (schema: Schema): Handler => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property])

        if (error) {
            console.log(`Invalid request: ${error}`)
            res.status(400).json({ error })
        } else {
            req[property] = value
            next()
        }
    }
}

export const validateRequestBody = validateRequest('body')
export const validateRequestQuery = validateRequest('query')

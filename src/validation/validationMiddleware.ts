import type { Handler } from "express"
import type { DefinedError, ValidateFunction } from "ajv"

type RequestProperty = "body" | "query" | "params"

const validateRequest = (property: RequestProperty) => (validate: ValidateFunction): Handler => {
    return (req, res, next) => {
        if (validate(req[property])) {
            next()
        } else {
            const errors = validate.errors as DefinedError[]
            const validationMessage = errors[0].message
            const param = errors[0].instancePath.split("/").slice(-1)[0]

            const message = `Invalid request: ${param} ${validationMessage}`
            const error = { type: "BadRequest", message, status: 400 }

            res.status(400).json({ error })
        }
    }
}

export const validateRequestBody = validateRequest('body')
export const validateRequestQuery = validateRequest('query')

import type { Handler } from "express"
import type { ValidateFunction } from "ajv"

type RequestProperty = "body" | "query" | "params"

const validateRequest = (property: RequestProperty) => (validate: ValidateFunction): Handler => {
    return (req, res, next) => {
        if (validate(req[property])) {
            next()
        } else if (validate.errors) {
            const { errors } = validate
            const validationMessage = errors[0].message
            const param = errors[0].instancePath.split("/").slice(-1)[0]

            res.status(400)
            next(new Error(`Invalid request: ${param} ${validationMessage}`))
        } else {
            res.status(500)
            next(new Error("Internal server error"))
        }
    }
}

export const validateRequestBody = validateRequest('body')
export const validateRequestQuery = validateRequest('query')
